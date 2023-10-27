import NumParameterInput from "../NumParameterInput/NumParameterInput";

import { crementFeedbackTime, crementHitUpgradeThreshold, modifyAcceptedAcknowledgements } from "../../state/redux/feedbackParameterSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import StringParameterInput from "../StringParamInput/StringParameterInput";

const FeedBackParameters = ()=>{
    const {
        feedbackTime, 
        hitUpgradeThreshold, 
        acknowledgementsAccepted
    } = useSelector((state:RootState)=>state.feedbackParameterReducer);



    return (
            <div>
                <NumParameterInput name= "Time to Acknowledge" val={feedbackTime} propDelta={crementFeedbackTime}/>
                <NumParameterInput name= "Upgrade Threshold" val={hitUpgradeThreshold} propDelta={crementHitUpgradeThreshold}/>
                <StringParameterInput isMultiline={true} name="Acknowledgements Accepted" val={acknowledgementsAccepted.join(',')} action={modifyAcceptedAcknowledgements}/>
            </div>
        
    )

}

export default FeedBackParameters;