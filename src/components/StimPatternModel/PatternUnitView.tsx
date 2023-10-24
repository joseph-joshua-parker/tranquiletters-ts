import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PatternUnitModel, typeToIconMap } from "../../shared/models/patternUnitModel"
import { STIM_TYPES } from "../../shared/models/stimTypes"
import { useContext, useState } from "react"
import CurrentStimTypeContext from "../../state/contexts/CurrentStimTypeContext"
import { useDispatch } from "react-redux"
import { addFeedback, removeFeedback } from "../../state/redux/feedbackParameterSlice"
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
            color={isSilence(unit) ? 'white' : 'gray' } 
            icon={typeToIconMap[unit.type]} 
            onClick={()=>dispatch(toggleStim(index))}
        />)
}

export default StimPatternView