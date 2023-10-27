
//React & Redux API
import { useDispatch, useSelector } from "react-redux"

//Views & Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"

//Models & enums
import { STIM_TYPES } from "../../shared/models/stimTypes"

//Redux
import { toggleStim } from "../../state/redux/stimToggleSlice"
import { addFeedback } from "../../state/redux/feedbackParameterSlice"
import { RootState } from "../../state/redux/store"

interface StimPatternViewProps {
    unit: PatternUnitModel,
    index: number
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit, index})=>{

    const dispatch = useDispatch();
    const {currentStimType} = useSelector((state:RootState)=>state.stimToggleSliceReducer);


    const isSilence = (unit:PatternUnitModel)=> unit.type == STIM_TYPES.Silence
    const chooseToggle = (index: number)=>{
        switch(currentStimType){
            case STIM_TYPES.Feedback: dispatch(addFeedback(index)); break;
            case STIM_TYPES.Token: dispatch(toggleStim(index)); break;
            default: return;
        }
    }

    return (
        <FontAwesomeIcon 
            style={{width:'5vw'}} 
            color={isSilence(unit) ? 'black' : '#303030' } 
            icon={typeToIconMap[unit.type]} 
            onClick={()=>chooseToggle(index)}
        />)
}

export default StimPatternView