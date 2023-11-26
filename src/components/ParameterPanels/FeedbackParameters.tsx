import NumParameterInput from "../ParameterInputFields/NumParameterInput/NumParameterInput";

import { crementFeedbackTime, crementHitUpgradeThreshold, crementStrikeThreshold, modifyAcceptedAcknowledgements, modifyAcceptedDecreases, modifyAcceptedIncreases, modifyFeedbackTime, modifyHitUpgradeThreshold, modifyStrikeThreshold, resetTodaysProgress, setTodaysDate, toggleAdaptation, toggleClusterReduction, toggleFeedbackGeneration, toggleVocal } from "../../state/redux/feedbackParameterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";
import StringParameterInput from "../ParameterInputFields/StringParamInput/StringParameterInput";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";
import { useContext, useState } from "react";
import PlaybackContext from "../../state/contexts/PlaybackContext";
import BooleanParameterInput from "../ParameterInputFields/BooleanParameterInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import MediaKeyController from "../../shared/utilities/MediaKeyController";
import { convertHMS, todayIs } from "../../shared/utilities/date";

const FeedBackParameters = ()=>{
    const {
        feedbackTime, 
        hitUpgradeThreshold, 
        acknowledgementsAccepted,
        increasesAccepted,
        decreasesAccepted,
        isAdaptive,
        isVocal,
        strikeThreshold,
        isGeneratingFeedback,
        isReducingClusters,
        todaysProgress,
        todaysDate
    } = useSelector((state:RootState)=>state.persistedRootReducer.feedbackParameterReducer);


    const dispatch = useDispatch();

    const {answerQuestion, seekCommand} = useContext(PlaybackContext);
    const [isViewingVocalOptions, setIsViewingVocalOptions] = useState(false);
    const vocalOptionsExpand = isViewingVocalOptions ? faChevronUp : faChevronDown
    const toggleVocalOptionsView = ()=> setIsViewingVocalOptions(prev=>!prev);


    const [isViewingAdaptiveOptions, setIsViewingAdaptiveOptions] = useState(false);
    const adaptiveOptionsExpand = isViewingAdaptiveOptions ? faChevronUp : faChevronDown
    const toggleAdaptiveOptionsView = ()=> setIsViewingAdaptiveOptions(prev=>!prev);

    const [isMediaKey, setMediaKey] = useState(false);
    const toggleMediaKey = ()=>setMediaKey(prev=>!prev);
    const [isViewingMediaKeyOptions, setIsViewingMediaKeyOptions] = useState(false);
    const mediaKeyOptionsExpand = isViewingMediaKeyOptions ? faChevronUp : faChevronDown;
    const toggleMediaKeyOptionsView = ()=>setIsViewingMediaKeyOptions(prev => !prev);


    if(todaysDate != todayIs()){
        dispatch(resetTodaysProgress());
        dispatch(setTodaysDate());
    }    


    return (
            <div>

                <label className="label">Today's Progress: {convertHMS(todaysProgress)}</label>

                <NumParameterInput link={TUTORIAL_KEYS.FeedbackGeneral} name= "Time to Acknowledge (Seconds)" val={feedbackTime} modify={modifyFeedbackTime} delta={crementFeedbackTime}/>
                <NumParameterInput link={TUTORIAL_KEYS.FeedbackStrikes} name= "Number of Strikes" val={strikeThreshold} modify={modifyStrikeThreshold} delta={crementStrikeThreshold}/>
                

                <div style={{display:'flex', justifyContent:'center', margin:'1rem'}}>
                    <button onClick={answerQuestion} className="button is-large">Acknowledge</button>
                </div>

                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.FeedbackByMediaKeys} 
                    htmlMeta={'toggleMediaKey'} 
                    state={isMediaKey} setStateHandler={toggleMediaKey}> 
                        Media Key Mode
                        <FontAwesomeIcon style={{marginLeft:'1rem'}} icon={mediaKeyOptionsExpand} onClick={toggleMediaKeyOptionsView}/>

                </BooleanParameterInput>


                { isMediaKey &&
                    <MediaKeyController onSingleTap={answerQuestion} onDoubleTap={seekCommand} wait = {1000}/>
                }


                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.FeedbackByVoice} 
                    htmlMeta={'toggleVocal'} state={isVocal} 
                    dispatchHandler={toggleVocal}
                    >
                        Vocal Mode 
                        <FontAwesomeIcon style={{marginLeft:'1rem'}} icon={vocalOptionsExpand} onClick={toggleVocalOptionsView}/>

                </BooleanParameterInput>
                

                {isViewingVocalOptions &&
                    <div>
                        <StringParameterInput isMultiline={true} name="Acknowledgements Accepted" val={acknowledgementsAccepted.join(',')} action={modifyAcceptedAcknowledgements}/>
                        <StringParameterInput isMultiline={true} name="Increases Accepted" val={increasesAccepted.join(',')} action={modifyAcceptedIncreases}/>
                        <StringParameterInput isMultiline={true} name="Decreases Accepted" val={decreasesAccepted.join(',')} action={modifyAcceptedDecreases}/>
                    </div>
                }


                <BooleanParameterInput 
                    link={TUTORIAL_KEYS.Adaptive} 
                    htmlMeta={'toggleAdaptation'} state={isAdaptive}
                    dispatchHandler={toggleAdaptation}>
                        Adaptive Mode
                        <FontAwesomeIcon style={{marginLeft:'1rem'}} icon={adaptiveOptionsExpand} onClick={toggleAdaptiveOptionsView}/>

                </BooleanParameterInput>

                {isViewingAdaptiveOptions &&
                    <div>
                        <NumParameterInput
                            delta={crementHitUpgradeThreshold}
                            modify={modifyHitUpgradeThreshold}
                            val={hitUpgradeThreshold}
                            name="Successes needed to trigger Adaptation"/>

                            {/*
                            <BooleanParameterInput
                                link={TUTORIAL_KEYS.GenerateFeedback}
                                htmlMeta={'toggleFeedbackGeneration'} state={isGeneratingFeedback}
                                switchHandler={toggleFeedbackGeneration}>
                                    Generate Feedback
                            </BooleanParameterInput>
                    
                    
                        <BooleanParameterInput 
                            link={TUTORIAL_KEYS.ReduceClusters} 
                            htmlMeta={'reduceClusters'} state={isReducingClusters}
                            switchHandler={toggleClusterReduction}>
                                Reduce Clusters
                        </BooleanParameterInput>*/}
                    </div>
                }
            </div>
        
    )

}

export default FeedBackParameters;