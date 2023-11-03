import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound, feedbackTime, isVocal, hitUpgradeThreshold, isAdaptive, isGeneratingFeedback, isReducingClusters, acknowledgementsAccepted},
        tokenSetParameterReducer : {tokenSets, currentlySelectedSet},
        stimToggleSliceReducer: {patternModel, sessionMinutes}
    } = useSelector((state: RootState)=>state.persistedRootReducer)
    

    return {
        sessionMinutes,
        tokenSets, currentlySelectedSet,
        questionSound, 
        feedbackTime, 
        hitUpgradeThreshold,
        isAdaptive, 
        isVocal,
        isGeneratingFeedback,
        isReducingClusters,

        acknowledgementsAccepted,
    
        patternModel
    };

}

export default usePayloads;