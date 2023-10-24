import { Cursor, PatternUnitModel,typeToIconMap } from "../../shared/models/patternUnitModel"
import { STIM_TYPES } from "../../shared/models/stimTypes";


import chunkify from "../../shared/utilities/chunkify";
import StimPatternView from "./PatternUnitView";


interface StimPatternModelProps {
    model : PatternUnitModel[]
    cursorIndex: number
    selectedStimType: STIM_TYPES
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({model, cursorIndex})=>{

    if(cursorIndex >= 0)   
        model[cursorIndex] = Cursor;


    
    const factor = model.length / 20 + 1;
    const balanced = !!(model.length % factor)
    const chunkedStims = chunkify(model, factor, balanced)



    const displayedModel = chunkedStims.map(
        (chunk, outerIndex)=> <div>
             {chunk.map((unit, innerIndex)=> <StimPatternView index={outerIndex + innerIndex} unit={unit}/>)}
        </div>
    )

  


        

    return (
        <div>
            {displayedModel}
        </div>
    )
}

export default StimPatternModel