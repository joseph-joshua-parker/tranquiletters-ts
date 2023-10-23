import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"
import { STIM_TYPES } from "../../shared/models/stimTypes"
import { useContext, useState } from "react"
import CurrentStimTypeContext from "../../state/contexts/CurrentStimTypeContext"

interface StimPatternViewProps {
    unit: PatternUnitModel
}

const StimPatternView: React.FC<StimPatternViewProps> = ({unit})=>{
    const isSilence = (unit:PatternUnitModel)=> unit.type == STIM_TYPES.Silence
    const [stimType, setStimType] = useState(unit.type);
    const currentStimType = useContext(CurrentStimTypeContext);

    const toggleStimType = ()=>{
        setStimType(currentStimType);
    }



    return (
        <FontAwesomeIcon 
            style={{width:'5vw'}} 
            color={isSilence(unit) ? 'white' : 'gray' } 
            icon={typeToIconMap[stimType]} 
            onClick={toggleStimType}
        />)
}

export default StimPatternView