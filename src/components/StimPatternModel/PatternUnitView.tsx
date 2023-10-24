import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"
import { STIM_TYPES } from "../../shared/models/stimTypes"
import { useContext, useState } from "react"
import CurrentStimTypeContext from "../../state/contexts/CurrentStimTypeContext"
import { addFeedback } from "../../state/redux/feedbackParameterSlice"
import { translate } from "../../state/redux/tokenNumParameterSlice"
interface StimPatternViewProps {
    unit: PatternUnitModel,
    index: number
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit, index})=>{
    const [stimType, setStimType] = useState(unit.type);
    const currentStimType = useContext(CurrentStimTypeContext);



    const isSilence = (unit:PatternUnitModel)=> unit.type == STIM_TYPES.Silence

    const toggleStimType = ()=>{
        setStimType(currentStimType);
    }



    return (
        <FontAwesomeIcon 
            style={{width:'5vw'}} 
            color={isSilence(unit) ? 'white' : 'gray' } 
            icon={typeToIconMap[stimType]} 
            onClick={()=>translate(index)}
        />)
}

export default StimPatternView