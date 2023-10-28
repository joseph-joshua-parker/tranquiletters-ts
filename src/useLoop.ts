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
      feedbackTime, hitUpgradeThreshold, isAdaptive, isVocal, acknowledgementsAccepted,
      patternModel
    } = usePayloads();
    const {

      askQuestion, reset, strikeCount, hitCount} = useFeedback({feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted, isVocal });



  
    const sessionTime = SessionTime*60*1000;

    const selectToken = ()=>{
        const max = tokens.length-1;
        return tokens[Math.floor(Math.random()*max)];
    }

  let sessionInterval: MutableRefObject<NodeJS.Timer | undefined> = useRef(undefined);
  let timeElapsed = useRef(0)
  let currentIndex = useRef(0);

    const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.Waiting);
    const delay = playbackState == PLAYBACK_STATE.Playing ? 1000 : null;

    usePatternModelSelector(hitCount.current)
    useEffect(()=>{
      if(!isAdaptive) return;
      if(hitCount.current >= hitUpgradeThreshold){
        pause();
        speak('Ease of focus detected, reducing stimulation');
        setTimeout(resume, 5000)
        if(TPC > 1) dispatch(crementNumParameter({name: 'Tokens/Cluster', val:-Math.trunc(TPC/2)}))
        else dispatch(crementNumParameter({name:'Silence/Clusters', val:SBC}))



        reset();
      }
    },[hitCount.current])



  
    useInterval(()=>{
      if(strikeCount.current >= 3){
        speak('Over excitedness detected; consider changing parameters');
        cancel();
      }
      if(timeElapsed.current >= sessionTime) {
        cancel();
        speak('Session Finished');
        return;
      }

      if(currentIndex.current >= patternModel.length-1)
      currentIndex.current = -1;
      
      const unit = patternModel[++currentIndex.current];
      setCursorIndex(currentIndex.current);
      switch(unit.type){
        case STIM_TYPES.Token: speak(selectToken()); break;
        case STIM_TYPES.Feedback: askQuestion(); console.log('feedback'); break;

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
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  const pause = ()=>{
    clearInterval(sessionInterval.current);
    sessionInterval.current = undefined;
    setPlaybackState(PLAYBACK_STATE.Paused);
  }

  const rerender = ()=>{
    const originalState = playbackState;
    pause();
    resume(); 
  }

  const start = ()=>{
    setCursorIndex(0)
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  return {start, pause, resume, cancel, rerender, playbackState, currentIndex}
}

export default useLoop;