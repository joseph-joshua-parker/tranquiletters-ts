//React & Redux API
import { batch, useDispatch, useSelector } from "react-redux";

//Models & enums
import { Cursor, PatternUnitModel, Silence } from "../../shared/models/patternUnitModel"

//Views & Components
import StimPatternView from "./PatternUnitView";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import { RootState } from "../../state/redux/store";
import { STIM_TYPES } from "../../shared/models/stimTypes";
import TutorialLink from "../TutorialLink";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";
import { clearAllFeedback, removeFeedback } from "../../state/redux/feedbackParameterSlice";
import { clearAllSoundEffects, removeSoundEffect } from "../../state/redux/soundEffectsSlice";
import { addToken, clearAllTokens, removeToken } from "../../state/redux/tokenNumParameterSlice";
import { clearModel, crementModelLength, modifyModelLength, setStim } from "../../state/redux/stimToggleSlice";
import NumParameterInput from "../ParameterInputFields/NumParameterInput/NumParameterInput";
import useCompositeActions from "../../state/redux/compositeActions";
import { useEffect } from "react";




interface StimPatternModelProps {
    cursorIndex:number,
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({cursorIndex})=>{

    const dispatch = useDispatch();
    const {silenceAll} = useCompositeActions();

    const {patternModel} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer)
    const {
        feedbackParameterReducer, 
        soundEffectsReducer, 
        tokenNumParameterReducer, 
        stimToggleSliceReducer,
        tokenSetParameterReducer
    } = useSelector((state:RootState)=>state.persistedRootReducer)

    const {feedbackAt} = feedbackParameterReducer;
    const {tokensAt} = tokenNumParameterReducer;
    const {soundEffectsAt} = soundEffectsReducer;




    const {currentlySelectedSet, tokenSets} = tokenSetParameterReducer;
    



        useEffect(()=>{
                const newLength = patternModel.length;

                //If decremented
                feedbackAt
                    .filter(index => index > newLength)
                    .forEach(index=> removeFeedback(index));
                
                
                tokensAt
                    .filter(index => index > newLength)
                    .forEach(index=> removeToken(index));

                soundEffectsAt
                    .filter(index => index > newLength)
                    .forEach(index=> removeSoundEffect(index));


                //If incremented
                let units = 0;
                patternModel.forEach((unit, index)=>{
                    if(unit) units++;
                })

                for(let i=units; i<newLength; i++)
                    dispatch(setStim({index:i, type:STIM_TYPES.Silence}));
                
    }, [patternModel.length]);

    //Add Tokens
    useEffect(()=>{    
        dispatch(clearModel());
        console.log('rerendering')
        tokensAt.forEach(index => dispatch(setStim({index, type:STIM_TYPES.Token})));
        //Add Feedback
        feedbackAt.forEach(index => dispatch(setStim({index, type:STIM_TYPES.Feedback})));
        soundEffectsAt.forEach(index => dispatch(setStim({index, type:STIM_TYPES.SoundFX})));
    }, [feedbackAt.length, tokensAt.length, soundEffectsAt.length]);

    const displayedModel = patternModel.map((unit, index)=>{
            return index != cursorIndex
            ? <StimPatternView index={index} unit={unit}/>
            : <StimPatternView index={index} unit={Cursor}/>
        } 
    )

    return (
        <div style={{display:'flex', flexDirection:'column'}}>

            <div style={{paddingBottom: '1vh', display:'flex', justifyContent: 'center'}}>
                <TutorialLink link={TUTORIAL_KEYS.Timeline}/>
            </div>

            <div className="columns is-mobile">

                <div className="column is-10" >
                    {displayedModel}
                </div>

      

            </div>


            <div style= {{display:'flex', alignContent:'start', justifyContent:'space-evenly'}}>
                <button style={{marginTop:'1vh'}} className='button' onClick={silenceAll}>Silence All</button>
            </div>
        </div>
    );
}

export default StimPatternModel