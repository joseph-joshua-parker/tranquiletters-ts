
//React & Redux API
import { batch, useDispatch, useSelector } from "react-redux"

//Views & Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"

//Models & enums
import { STIM_TYPES } from "../../shared/models/stimTypes"

//Redux
import { toggleStim } from "../../state/redux/stimToggleSlice"
import { addFeedback, removeFeedback } from "../../state/redux/feedbackParameterSlice"
import { RootState } from "../../state/redux/store"
import { addSoundEffect, removeSoundEffect } from "../../state/redux/soundEffectsSlice"

interface StimPatternViewProps {
    unit: PatternUnitModel,
    index: number
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit, index})=>{

    const dispatch = useDispatch();
    const {currentStimType} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer);


    const isSilence = (unit:PatternUnitModel)=> unit.type == STIM_TYPES.Silence
    const chooseToToggle = ()=>{
        if(currentStimType == STIM_TYPES.None) return;

        dispatch(toggleStim({index, stimType: currentStimType}));
        switch(currentStimType){
            case STIM_TYPES.Feedback: {
                if(unit.type == STIM_TYPES.Feedback)    dispatch(removeFeedback(index));
                else                                    dispatch(addFeedback(index));
                break;
            }

            case STIM_TYPES.SoundFX: {
                if(unit.type == STIM_TYPES.SoundFX)    dispatch(removeSoundEffect(index));
                else                                    dispatch(addSoundEffect(index));
                break;
            } 
        }    
    }

    return (
        <FontAwesomeIcon 
            style={{width:'5vw'}} 
            color={isSilence(unit) ? 'black' : '#303030' } 
            icon={typeToIconMap[unit.type]} 
            onClick={chooseToToggle}
        />)
}

export default StimPatternView