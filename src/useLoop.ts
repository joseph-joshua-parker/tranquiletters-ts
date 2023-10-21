import { PatternUnit } from "./shared/models/patternUnit";
import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from "./shared/models/stimTypes";
import { useState, useRef, MutableRefObject } from "react";


export enum PLAYBACK_STATE {
    Paused,
    Playing,
    Waiting,
}


 const useLoop = (patternModel: PatternUnit[], sessionMinutes: number, selectToken: ()=>string)=>{
    init();
    const sessionTime = sessionMinutes*60*1000;

  let sessionInterval: MutableRefObject<NodeJS.Timer | undefined> = useRef(undefined);
  let timeElapsed = useRef(0)
  let unitsTraversed = useRef(0);

    const [playbackState, setPlaybackState] = useState<PLAYBACK_STATE>(PLAYBACK_STATE.Waiting);

  const loop = ()=>{ 
    sessionInterval.current = setInterval(()=>{
      console.log(timeElapsed.current)
      if(timeElapsed.current >= sessionTime) {
        cancel();
        return;
      }

      else if(unitsTraversed.current >= patternModel.length)
        unitsTraversed.current = 0;
      
      const unit = patternModel[unitsTraversed.current++];
      if(unit.type == STIM_TYPES.Verbal){
        console.log(unit.payload);
        speak(selectToken());
      }

      timeElapsed.current += 1000;
    }, 1000)
}


  const cancel = ()=>{
    clearInterval(sessionInterval.current);
    sessionInterval.current = undefined;
    timeElapsed.current = 0;
    unitsTraversed.current = 0;
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
    loop();
    setPlaybackState(PLAYBACK_STATE.Playing)
  }

  return {start, pause, resume, cancel, playbackState}
}

export default useLoop;