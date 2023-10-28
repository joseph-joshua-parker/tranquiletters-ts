import NumParameterInput from "../NumParameterInput/NumParameterInput";

import { crementFeedbackTime, crementHitUpgradeThreshold, modifyAcceptedAcknowledgements, toggleAdaptation, toggleVocal } from "../../state/redux/feedbackParameterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import TutorialLink from "../TutorialLink";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";
import { useContext } from "react";
import PlaybackContext from "../../state/contexts/PlaybackContext";

const FeedBackParameters = ()=>{
    const {
        feedbackTime, 
        hitUpgradeThreshold, 
        acknowledgementsAccepted,
        isAdaptive,
        isVocal
    } = useSelector((state:RootState)=>state.feedbackParameterReducer);

    const dispatch = useDispatch();
    const handleAdaptationToggle = ()=>{
        dispatch(toggleAdaptation());
    }

    const handleVocalToggle = ()=>{
        dispatch(toggleVocal())
    }

    const {answerQuestion} = useContext(PlaybackContext);


    return (
            <div>
                <NumParameterInput link={TUTORIAL_KEYS.FeedbackGeneral} name= "Time to Acknowledge (Seconds)" val={feedbackTime} propDelta={crementFeedbackTime}/>
                
                <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                    <button onClick={answerQuestion} className="button is-large">Acknowledge</button>
                </div>

                <div className="field">
                    <input id="toggleVocal" type="checkbox" name="toggleMediaKey" className="switch" checked={false}/>
                    <label htmlFor="toggleVocal">Media Key Mode</label>
                    <TutorialLink link={TUTORIAL_KEYS.FeedbackByMediaKeys}/>
                </div>

                <div className="field">
                    <input onChange={handleVocalToggle} id="toggleVocal" type="checkbox" name="toggleVocal" className="switch" checked={isVocal}/>
                    <label htmlFor="toggleVocal">Vocal Mode</label>
                    <TutorialLink link={TUTORIAL_KEYS.FeedbackByVoice}/>
                </div>
                {isVocal &&
                    <StringParameterInput isMultiline={true} name="Acknowledgements Accepted" val={acknowledgementsAccepted.join(',')} action={modifyAcceptedAcknowledgements}/>
                }

                <div className="field">
                    <input onChange={handleAdaptationToggle} id="toggleAdaptation" type="checkbox" name="toggleAdaptation" className="switch" checked={isAdaptive}/>
                    <label htmlFor="toggleAdaptation">Adaptive Mode</label>
                    <TutorialLink link={TUTORIAL_KEYS.Adaptive}/>

                </div>
                {isAdaptive && 
                    <NumParameterInput name="Reduce stimulation after this many successful acknowledgements" val={hitUpgradeThreshold} propDelta = {crementHitUpgradeThreshold}/>
                }

            </div>
        
    )

}

export default FeedBackParameters;