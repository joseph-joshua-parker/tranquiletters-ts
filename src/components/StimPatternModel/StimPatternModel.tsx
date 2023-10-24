import { Cursor, PatternUnitModel } from "../../shared/models/patternUnitModel"
;
import StimPatternView from "./PatternUnitView";


interface StimPatternModelProps {
    model : PatternUnitModel[],
    cursorIndex:number
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({model, cursorIndex})=>{

    const displayedModel = model.map((unit, index)=>{
            return index != cursorIndex
            ? <StimPatternView index={index} unit={unit}/>
            : <StimPatternView index={index} unit={Cursor}/>
        } 
    )

    return (
        <div>
            {displayedModel}
        </div>
    )
}

export default StimPatternModel