import { STIM_TYPES } from "./stimTypes";
import { fas, faSignature, faVolumeHigh, faReply  } from '@fortawesome/free-solid-svg-icons'

export class PatternUnit {

    constructor(public type: STIM_TYPES, public payload: string){}
}

export const Silence = new PatternUnit(STIM_TYPES.Silence, 'Silence');

export const typeToIconMap = {
    [STIM_TYPES.Verbal]: faSignature,
    [STIM_TYPES.SoundFX]: faVolumeHigh,
    [STIM_TYPES.Feedback]: faReply,
    [STIM_TYPES.Silence]: null
}