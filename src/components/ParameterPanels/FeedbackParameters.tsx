import NumParameterInput from "../ParameterInputFields/NumParameterInput/NumParameterInput";

import { crementFeedbackTime, crementHitUpgradeThreshold, modifyAcceptedAcknowledgements, toggleAdaptation, toggleClusterReduction, toggleFeedbackGeneration, toggleVocal } from "../../state/redux/feedbackParameterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import StringParameterInput from "../ParameterInputFields/StringParamInput/StringParameterInput";
import TutorialLink from "../TutorialLink";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";
import { useContext } from "react";
import PlaybackContext from "../../state/contexts/PlaybackContext";
import BooleanParameterInput from "../ParameterInputFields/BooleanParameterInput";

const FeedBackParameters = ()=>{
    const {
        feedbackTime, 
        hitUpgradeThreshold, 
        acknowledgementsAccepted,
        isAdaptive,
        isVocal,
        isGeneratingFeedback,
        isReducingClusters,
    } = useSelector((state:RootState)=>state.persistedRootReducer.feedbackParameterReducer);




    const {answerQuestion} = useContext(PlaybackContext);


    return (
            <div>
                <NumParameterInput link={TUTORIAL_KEYS.FeedbackGeneral} name= "Time to Acknowledge (Seconds)" val={feedbackTime} propDelta={crementFeedbackTime}/>
                
                <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                    <button onClick={answerQuestion} className="button is-large">Acknowledge</button>
                </div>



                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.FeedbackByMediaKeys} 
                    htmlMeta={'toggleMediaKey'} state={false}>
                        Media Key Mode
                </BooleanParameterInput>

                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.FeedbackByVoice} 
                    htmlMeta={'toggleVocal'} state={isVocal} 
                    switchHandler={toggleVocal}>
                        Vocal Mode
                </BooleanParameterInput>

                {isVocal &&
                    <StringParameterInput isMultiline={true} name="Acknowledgements Accepted" val={acknowledgementsAccepted.join(',')} action={modifyAcceptedAcknowledgements}/>
                }


                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.Adaptive} 
                    htmlMeta={'toggleAdaptation'} state={isAdaptive}
                    switchHandler={toggleAdaptation}>
                        Adaptive Mode
                </BooleanParameterInput>

                {isAdaptive &&
                    <NumParameterInput 
                        propDelta={crementHitUpgradeThreshold} 
                        val={hitUpgradeThreshold} 
                        name="Successes needed to trigger Adaptation"
                    />
                }

                {isAdaptive &&
                    <BooleanParameterInput 
                        link={TUTORIAL_KEYS.GenerateFeedback} 
                        htmlMeta={'toggleFeedbackGeneration'} state={isGeneratingFeedback}
                        switchHandler={toggleFeedbackGeneration}>
                            Generate Feedback
                    </BooleanParameterInput>
                }

                {isAdaptive &&
                    <BooleanParameterInput 
                        link={TUTORIAL_KEYS.ReduceClusters} 
                        htmlMeta={'reduceClusters'} state={isReducingClusters}
                        switchHandler={toggleClusterReduction}>
                            Reduce Clusters
                    </BooleanParameterInput>
                }


                

            </div>
        
    )

}

export default FeedBackParameters;