import { batch, useDispatch, useSelector } from "react-redux";
import { STIM_TYPES } from "../../shared/models/stimTypes";
import { addFeedback, clearAllFeedback, removeFeedback } from "./feedbackParameterSlice";
import { addSoundEffect, clearAllSoundEffects, removeSoundEffect } from "./soundEffectsSlice";
import stimToggleSlice, { crementModelLength, setStim } from "./stimToggleSlice";
import { RootState } from "./store";
import tokenNumParameterSlice, { addToken, clearAllTokens, removeToken } from "./tokenNumParameterSlice";


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

    const replaceStimAtWith = (at: number, stim: STIM_TYPES) =>{
        switch(stim){
            case STIM_TYPES.Feedback : {
                dispatch(removeSoundEffect(at));
                dispatch(removeToken(at));
                dispatch(addFeedback(at));
                break;
            }

            case STIM_TYPES.SoundFX : {
                dispatch(removeFeedback(at));
                dispatch(removeToken(at));
                dispatch(addSoundEffect(at));
                break;
            }

            case STIM_TYPES.Token : {
                dispatch(removeFeedback(at));
                dispatch(removeSoundEffect(at));
                dispatch(addToken(at));
            }
        }
    }



    return {silenceAll, replaceStimAtWith};
}

export default useCompositeActions;
 