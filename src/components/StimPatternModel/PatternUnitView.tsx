
//React & Redux API
import { useDispatch } from "react-redux"

//Views & Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"

//Models & enums
import { STIM_TYPES } from "../../shared/models/stimTypes"

//Redux
import { toggleStim } from "../../state/redux/stimToggleSlice"

interface StimPatternViewProps {
    unit: PatternUnitModel,
    index: number
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit, index})=>{

    const dispatch = useDispatch();


    const isSilence = (unit:PatternUnitModel)=> unit.type == STIM_TYPES.Silence


    return (
        <FontAwesomeIcon 
            style={{width:'5vw'}} 
            color={isSilence(unit) ? 'black' : 'dark-gray' } 
            icon={typeToIconMap[unit.type]} 
            onClick={()=>dispatch(toggleStim(index))}
        />)
}

export default StimPatternView