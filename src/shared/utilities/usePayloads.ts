import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound, feedbackTime, isVocal, hitUpgradeThreshold, isAdaptive, isGeneratingFeedback, isReducingClusters, acknowledgementsAccepted},
        tokenSetParameterReducer : {['Tokens']: tokens},
        tokenNumParameterReducer:  {
            tokensPerCluster,
            silenceBetweenTokens,
          },
        stimToggleSliceReducer: {patternModel, sessionMinutes}
    } = useSelector((state: RootState)=>state.persistedRootReducer)
    

    return {
        tokensPerCluster,
        silenceBetweenTokens,
        sessionMinutes,
        tokens, 
        
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