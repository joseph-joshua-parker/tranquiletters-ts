import { PatternUnitModel } from "./shared/models/patternUnitModel";
import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from "./shared/models/stimTypes";
import { useState, useRef, MutableRefObject, useEffect } from "react";
import usePayloads from "./shared/utilities/usePayloads";
import useFeedback from "./shared/utilities/useFeedback";
import { useDispatch, useSelector, useStore } from "react-redux";
import { crementNumParameter } from "./state/redux/tokenNumParameterSlice";
import { RootState } from "./state/redux/store";

export enum PLAYBACK_STATE {
    Paused,
    Playing,
    Waiting,
}


 const useLoop = (
    patternModel: PatternUnitModel[], 
    sessionMinutes: number, 
    setCursorIndex: React.Dispatch<React.SetStateAction<number>>
)=>{
    init();

    const dispatch = useDispatch();
    const sessionTime = sessionMinutes*60*1000;
    const {tokens, feedbackTime, hitUpgradeThreshold, isAdaptive, acknowledgementsAccepted} = usePayloads();
    const {askQuestion, answerQuestion, reset, strikeCount, hitTime, hitCount} = useFeedback({feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted });
    const store = useStore();
    const {
      ['Tokens/Cluster']: TPC,
      ['Silence/Clusters']: SBC
    } = (store.getState() as RootState).tokenNumParameterReducer;

    const selectToken = ()=>{
        const max = tokens.length-1;
        return tokens[Math.floor(Math.random()*max)];
    }

  let sessionInterval: MutableRefObject<NodeJS.Timer | undefined> = useRef(undefined);
  let timeElapsed = useRef(0)
  let currentIndex = useRef(0);

    const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.Waiting);

    useEffect(()=>{
      if(!isAdaptive) return;
      if(hitCount.current >= hitUpgradeThreshold){
        speak('Ease of focus detected, reducing stimulation');
        if(TPC > 1) dispatch(crementNumParameter({name: 'Tokens/Cluster', val:-1}))
        else dispatch(crementNumParameter({name:'Silence/Clusters', val:SBC}))
        reset();
      }
    },[hitCount.current])



  const loop = ()=>{ 
    sessionInterval.current = setInterval(()=>{
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
      console.log(unit.type)
      switch(unit.type){
        case STIM_TYPES.Token: speak(selectToken()); break;
        case STIM_TYPES.Feedback: askQuestion(); console.log('feedback'); break;

      }
      
      

      timeElapsed.current += 1000;
    }, 1000)
}


  const cancel = ()=>{
    clearInterval(sessionInterval.current);
    setCursorIndex(-1)
    sessionInterval.current = undefined;
    timeElapsed.current = 0;
    currentIndex.current = -1;
    setPlaybackState(PLAYBACK_STATE.Waiting);
  }

  const resume = ()=>{
    loop();
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  const pause = ()=>{
    clearInterval(sessionInterval.current);
    sessionInterval.current = undefined;
    setPlaybackState(PLAYBACK_STATE.Paused);
  }

  const start = ()=>{
    setCursorIndex(0)
    loop();
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  return {start, pause, resume, cancel, playbackState, currentIndex, answerQuestion}
}

export default useLoop;