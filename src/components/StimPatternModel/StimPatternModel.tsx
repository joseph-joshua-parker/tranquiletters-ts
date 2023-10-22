import { Cursor, PatternUnit } from "../../shared/models/patternUnit"
import { STIM_TYPES } from "../../shared/models/stimTypes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { typeToIconMap } from "../../shared/models/patternUnit";

import chunkify from "../../shared/utilities/chunkify";


interface StimPatternModelProps {
    model : PatternUnit[]
    cursorIndex: number
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({model, cursorIndex})=>{

    const isSilence = (unit:PatternUnit)=> unit.type == STIM_TYPES.Silence
    if(cursorIndex >= 0)   
        model[cursorIndex] = Cursor;


    
    const factor = model.length / 20 + 1;
    const balanced = !!(model.length % factor)
    const chunkedStims = chunkify(model, factor, balanced)




    const displayedModel = chunkedStims.map(
        chunk=> <div>
             {chunk.map((unit)=> 
                
                <FontAwesomeIcon style={{width:'5vw'}} color={isSilence(unit) ? 'white' : 'gray' } icon={typeToIconMap[unit.type]} />)}
            
        </div>
    )

  


        

    return (
        <div>
            {displayedModel}
        </div>
    )
}

export default StimPatternModel