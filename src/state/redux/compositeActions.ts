import { batch, useDispatch, useSelector } from "react-redux";
import { STIM_TYPES } from "../../shared/models/stimTypes";
import { addFeedback, clearAllFeedback, removeFeedback } from "./feedbackParameterSlice";
import { addSoundEffect, clearAllSoundEffects, removeSoundEffect } from "./soundEffectsSlice";
import stimToggleSlice, { crementModelLength, setStim } from "./stimToggleSlice";
import { RootState } from "./store";
import tokenNumParameterSlice, { clearAllTokens, removeToken } from "./tokenNumParameterSlice";


const useCompositeActions = ()=>{
    const dispatch = useDispatch();
    const {feedbackParameterReducer, soundEffectsReducer, tokenNumParameterReducer, stimToggleSliceReducer} = useSelector((state:RootState)=>state.persistedRootReducer)

    const {feedbackAt} = feedbackParameterReducer;
    const {tokensAt} = tokenNumParameterReducer;
    const {soundEffectsAt} = soundEffectsReducer;

    const {patternModel} = stimToggleSliceReducer;


    const silenceAll = ()=>{
        patternModel.forEach((unit, index)=> dispatch(setStim({index, type: STIM_TYPES.Silence})));
        dispatch(clearAllFeedback());
        dispatch(clearAllSoundEffects());
        dispatch(clearAllTokens());
    }



    return {silenceAll};
}

export default useCompositeActions;
 