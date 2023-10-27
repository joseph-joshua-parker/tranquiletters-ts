import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound, feedbackTime, hitUpgradeThreshold, isAdaptive, acknowledgementsAccepted},
        tokenSetParameterReducer : {['Tokens']: tokens},
    } = useSelector((state: RootState)=>state)
    

    return {tokens, questionSound, feedbackTime, hitUpgradeThreshold, isAdaptive, acknowledgementsAccepted};

}

export default usePayloads;