import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound, feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted},
        tokenSetParameterReducer : {['Tokens']: tokens}
    } = useSelector((state: RootState)=>state)
    

    return {tokens, questionSound, feedbackTime, hitUpgradeThreshold, acknowledgementsAccepted};

}

export default usePayloads;