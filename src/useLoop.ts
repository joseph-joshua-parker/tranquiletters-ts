import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from "./shared/models/stimTypes";
import { useState, useRef} from "react";
import usePayloads from "./shared/utilities/usePayloads";
import useFeedback from "./shared/utilities/useFeedback";
import { useDispatch, useSelector } from "react-redux";
import { crementNumParameter } from "./state/redux/tokenNumParameterSlice";
import usePatternModelSelector from "./state/usePatternModelSelector";
import {useInterval} from 'usehooks-ts';
import { addFeedback } from "./state/redux/feedbackParameterSlice";
import { RootState } from "./state/redux/store";
import useSound from 'use-sound';

const currentSound = require('./assets/soundFX/effect_1.wav');


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
      feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted, strikeThreshold:3,
      isVocal, isAdaptive, isReducingClusters, TPC,
      notifyUser, spreadClusters, cancel
    });

    const {soundEffectAt} = useSelector((state:RootState)=>state.persistedRootReducer.soundEffectsReducer);
    const [playSoundEffect] = useSound(currentSound); 

    const sessionTime = SessionTime*60*1000;

    const selectToken = ()=>{
        const max = tokens.length-1;
        return tokens[Math.floor(Math.random()*max)];
    }

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
        case STIM_TYPES.SoundFX: playSoundEffect(); break;
      }

      timeElapsed.current += 1000;
    }, delay)


  function start(){
      setCursorIndex(0)
      setPlaybackState(PLAYBACK_STATE.Playing)
    }

  function cancel(){

    reset();
    setCursorIndex(-1)

    timeElapsed.current = 0;
    currentIndex.current = -1;
    setPlaybackState(PLAYBACK_STATE.Waiting);
  }

  function resume(){
      setPlaybackState(PLAYBACK_STATE.Playing)
  }

  function pause(){
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


  return {answerQuestion, start, pause, resume, cancel, rerender, playbackState, currentIndex}
}

export default useLoop;