
//React & Redux API
import { batch, useDispatch, useSelector } from "react-redux"

//Views & Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, Silence, typeToIconMap } from "../../shared/models/patternUnitModel"

//Models & enums
import { STIM_TYPES } from "../../shared/models/stimTypes"

//Redux
import { addFeedback, removeFeedback } from "../../state/redux/feedbackParameterSlice"
import { RootState } from "../../state/redux/store"
import { addSoundEffect, removeSoundEffect } from "../../state/redux/soundEffectsSlice"
import { addToken, removeToken } from "../../state/redux/tokenNumParameterSlice"
import useCompositeActions from "../../state/redux/compositeActions"

interface StimPatternViewProps {
    unit: PatternUnitModel,
    index: number
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit, index})=>{

    const dispatch = useDispatch();
    const {currentStimType} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer);
    const {replaceStimAtWith} = useCompositeActions();

    const chooseToToggle = ()=>{

        if(currentStimType == STIM_TYPES.None) return;

        let add;
        let remove;

        switch(currentStimType){
            case STIM_TYPES.Feedback: {
                add = addFeedback;
                remove = removeFeedback;
                break;
            }

            case STIM_TYPES.SoundFX: {
                add = addSoundEffect;
                remove = removeSoundEffect;
                break;
            } 
            case STIM_TYPES.Token: {
                add = addToken;
                remove = removeToken;
                break;
            } 

            default : {
                add = null;
                remove = null;
            }
        }

        if(unit.type == STIM_TYPES.Silence && add){
            dispatch(add(index));
        }

        else if(unit.type == currentStimType && remove) {
            console.log('removing')
            dispatch(remove(index))
        }
        

        else if(unit.type != currentStimType){
            replaceStimAtWith(index, currentStimType);
        }
        
        


    }

    return unit &&
        <FontAwesomeIcon 
            style={{width:'5vw', borderRightStyle: 'solid', borderRightColor: 'dimgray', borderRightWidth:'1px'}} 
            color={unit.type == STIM_TYPES.Silence ? 'black' : '#303030' } 
            icon={typeToIconMap[unit.type]} 
            onClick={chooseToToggle}
        />

        
}

export default StimPatternView