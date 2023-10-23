import { createContext } from "react";
import { STIM_TYPES } from "../../shared/models/stimTypes";

const CurrentStimTypeContext = createContext<STIM_TYPES>(STIM_TYPES.Token);
export default CurrentStimTypeContext;