import { batch, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cursor, PatternUnitModel } from "../../shared/models/patternUnitModel"

import StimPatternView from "./PatternUnitView";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {  handleTranslate } from "../../state/redux/stimToggleSlice";


interface StimPatternModelProps {
    model : PatternUnitModel[],
    cursorIndex:number
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({model, cursorIndex})=>{

    const dispatch = useDispatch();

    const translate = (delta: number)=>{
        batch(()=>{
            dispatch(handleTranslate(delta))

        })
    }

    const displayedModel = model.map((unit, index)=>{
            return index != cursorIndex
            ? <StimPatternView index={index} unit={unit}/>
            : <StimPatternView index={index} unit={Cursor}/>
        } 
    )

    return (
        <div className="columns is-mobile">
            <div className="column" >
                <FontAwesomeIcon onClick={()=>translate(-1)} icon={faArrowLeft}/>
            </div>
            <div className="column" >
                {displayedModel}
            </div>
            <div className="column" >
                <FontAwesomeIcon onClick={()=>translate(1)} icon={faArrowRight}/>
            </div>
        </div>
    )
}

export default StimPatternModel