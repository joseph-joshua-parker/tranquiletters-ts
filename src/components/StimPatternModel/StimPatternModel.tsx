import { PatternUnit } from "../../shared/models/patternUnit"
import { STIM_TYPES } from "../../shared/models/stimTypes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { typeToIconMap } from "../../shared/models/patternUnit";
import { useSelector } from "react-redux";
import usePatternModelSelector from "../../state/usePatternModelSelector";

interface StimPatternModelProps {
    model : PatternUnit[]
}

const StimPatternModel = ()=>{
    const model = usePatternModelSelector();
    const isSilence = (unit:PatternUnit)=> unit.type == STIM_TYPES.Silence 
    const stims = model.map(unit=> <FontAwesomeIcon color={isSilence(unit) ? 'white' : 'gray' } icon={typeToIconMap[unit.type]} />);
    
        

    return (
        <div>
            {stims}
        </div>
    )
}

export default StimPatternModel