import { STIM_TYPES } from "./stimTypes";
import {  faSignature, faVolumeHigh, faReply, faSquare, faPause, faICursor  } from '@fortawesome/free-solid-svg-icons'
export class PatternUnitModel {

    constructor(public type: STIM_TYPES){}
}

export const Silence = new PatternUnitModel(STIM_TYPES.Silence);
export const End = new PatternUnitModel(STIM_TYPES.End);
export const Cursor = new PatternUnitModel(STIM_TYPES.Cursor);

export const typeToIconMap = {
    [STIM_TYPES.Token]: faSignature,
    [STIM_TYPES.SoundFX]: faVolumeHigh,
    [STIM_TYPES.Feedback]: faReply,
    [STIM_TYPES.Silence]: faSquare,
    [STIM_TYPES.Ambience]: faSquare,
    [STIM_TYPES.NormalRhythm]: faSquare,
    [STIM_TYPES.PolyRhythm]: faSquare,
    [STIM_TYPES.HigherOrderPatterns]: faSquare,
    [STIM_TYPES.End]: faPause,
    [STIM_TYPES.Cursor]: faICursor,
    [STIM_TYPES.None]: faSquare
}