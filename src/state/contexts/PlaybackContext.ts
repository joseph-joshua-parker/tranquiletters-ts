import { createContext } from "react";
import { PLAYBACK_STATE } from "../../useLoop";

interface PlaybackControl {
    start: ()=>void,
    pause: ()=>void,
    resume: ()=>void,
    cancel: ()=> void
    rerender: ()=>void,
    answerQuestion: ()=>void,
    seekCommand: ()=>void,
    playbackState: PLAYBACK_STATE
}

const PlaybackContext = createContext({} as PlaybackControl)
export default PlaybackContext;