import { PatternUnitModel } from "./shared/models/patternUnitModel";
import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from "./shared/models/stimTypes";
import { useState, useRef, MutableRefObject, useEffect } from "react";
import usePayloads from "./shared/utilities/usePayloads";
import useFeedback from "./shared/utilities/useFeedback";
import { useDispatch, useSelector, useStore } from "react-redux";
import { crementNumParameter } from "./state/redux/tokenNumParameterSlice";
import { RootState } from "./state/redux/store";
import usePatternModelSelector from "./state/usePatternModelSelector";
import {useInterval} from 'usehooks-ts';
import { toggleStim } from "./state/redux/stimToggleSlice";
import { addFeedback } from "./state/redux/feedbackParameterSlice";

export enum PLAYBACK_STATE {
    Paused = 'paused',
    Playing = 'playing',
    Waiting = 'waiting'
}


 const useLoop = (
    setCursorIndex: React.Dispatch<React.SetStateAction<number>>
)=>{
    init();

    const dispatch = useDispatch();

    const {
      TPC, SBC, SessionTime, tokens, 
      feedbackTime, hitUpgradeThreshold, isAdaptive, isVocal, isGeneratingFeedback, isReducingClusters, acknowledgementsAccepted,
      patternModel
    } = usePayloads();
    const {
      answerQuestion, askQuestion, reset, 
      strikeCount, hitCount
    } = useFeedback({ 
      feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted, 
      isVocal, isAdaptive, isReducingClusters, TPC,
      notifyUser, spreadClusters
    });



  
    const sessionTime = SessionTime*60*1000;

    const selectToken = ()=>{
        const max = tokens.length-1;
        return tokens[Math.floor(Math.random()*max)];
    }

  const sessionInterval: MutableRefObject<NodeJS.Timer | undefined> = useRef(undefined);
  const timeElapsed = useRef(0)
  const currentIndex = useRef(0);

    const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.Waiting);
    const delay = playbackState == PLAYBACK_STATE.Playing ? 1000 : null;

    

    function spreadClusters(){
      dispatch(crementNumParameter({name:'Silence/Clusters', val:SBC}))
      if(isGeneratingFeedback) dispatch(addFeedback(patternModel.length-1))
    }

    usePatternModelSelector(hitCount.current)

  
    useInterval(()=>{
      if(strikeCount.current >= 3){
        speak('Over excitedness detected; consider changing parameters');
        cancel();
        return
      }
      if(timeElapsed.current >= sessionTime) {
        speak('Session Finished');
        cancel();
        return;
      }

      //reset the timeline loop
      if(currentIndex.current >= patternModel.length-1)
      currentIndex.current = -1;
      
      const unit = patternModel[++currentIndex.current];
      setCursorIndex(currentIndex.current);
      switch(unit.type){
        case STIM_TYPES.Token: speak(selectToken()); break;
        case STIM_TYPES.Feedback: askQuestion();  break;

      }

      timeElapsed.current += 1000;
    }, delay)



  const cancel = ()=>{
    clearInterval(sessionInterval.current);
    reset();
    setCursorIndex(-1)
    sessionInterval.current = undefined;
    timeElapsed.current = 0;
    currentIndex.current = -1;
    setPlaybackState(PLAYBACK_STATE.Waiting);
  }

  const resume = ()=>{
    if(playbackState == PLAYBACK_STATE.Paused)
      setPlaybackState(PLAYBACK_STATE.Playing)
  }

  const pause = ()=>{
    clearInterval(sessionInterval.current);
    sessionInterval.current = undefined;
    setPlaybackState(PLAYBACK_STATE.Paused);
  }

  function notifyUser(message: string){
    pause();
    speak(message);
    setTimeout(resume, 5000)
  }

  const rerender = ()=>{
    pause();
    resume(); 
  }

  const start = ()=>{
    setCursorIndex(0)
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  return {answerQuestion, start, pause, resume, cancel, rerender, playbackState, currentIndex}
}

export default useLoop;