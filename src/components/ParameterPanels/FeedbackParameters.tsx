import NumParameterInput from "../NumParameterInput/NumParameterInput";

import { crementFeedbackTime, crementHitUpgradeThreshold, modifyAcceptedAcknowledgements, toggleAdaptation } from "../../state/redux/feedbackParameterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import TutorialLink from "../TutorialLink";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";

const FeedBackParameters = ()=>{
    const {
        feedbackTime, 
        hitUpgradeThreshold, 
        acknowledgementsAccepted,
        isAdaptive
    } = useSelector((state:RootState)=>state.feedbackParameterReducer);

    const dispatch = useDispatch();
    const handleAdaptationToggle = ()=>{
        dispatch(toggleAdaptation());
    }


    return (
            <div>
                <NumParameterInput link={TUTORIAL_KEYS.FeedbackGeneral} name= "Time to Acknowledge (Seconds)" val={feedbackTime} propDelta={crementFeedbackTime}/>
                <StringParameterInput link={TUTORIAL_KEYS.FeedbackByVoice} isMultiline={true} name="Acknowledgements Accepted" val={acknowledgementsAccepted.join(',')} action={modifyAcceptedAcknowledgements}/>
                
                <div className="field">
                    <input onChange={handleAdaptationToggle} id="toggleAdaptation" type="checkbox" name="toggleAdaptation" className="switch" checked={isAdaptive}/>
                    <label htmlFor="toggleAdaptation">Adaptive Mode</label>
                    <TutorialLink link={TUTORIAL_KEYS.Adaptive}/>

                </div>

                {isAdaptive && (
                    <NumParameterInput name="Reduce stimulation after this many successful acknowledgements" val={hitUpgradeThreshold} propDelta = {crementHitUpgradeThreshold}/>
                ) 
                    
                }
            </div>
        
    )

}

export default FeedBackParameters;