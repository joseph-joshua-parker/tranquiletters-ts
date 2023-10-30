//React & Redux API
import { batch, useDispatch, useSelector } from "react-redux";

//Models & enums
import { Cursor, PatternUnitModel } from "../../shared/models/patternUnitModel"

//Views & Components
import StimPatternView from "./PatternUnitView";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Redux
import {  handleTranslate } from "../../state/redux/stimToggleSlice";
import { RootState } from "../../state/redux/store";
import { STIM_TYPES } from "../../shared/models/stimTypes";
import TutorialLink from "../TutorialLink";
import { TUTORIAL_KEYS } from "../../shared/tutorialData";



interface StimPatternModelProps {
    cursorIndex:number,
    rerender:()=>void
}

const StimPatternModel: React.FC<StimPatternModelProps> = ({cursorIndex, rerender})=>{

    const dispatch = useDispatch();

    const {currentStimType, patternModel} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer)
    const CurrentlyImplemented = [STIM_TYPES.Token, STIM_TYPES.Feedback, STIM_TYPES.None]
    const isFeatureImplemented = CurrentlyImplemented.includes(currentStimType);

    const displayedModel = patternModel.map((unit, index)=>{
            return index != cursorIndex
            ? <StimPatternView index={index} unit={unit}/>
            : <StimPatternView index={index} unit={Cursor}/>
        } 
    )

    const modelPanel =    
        <div>
            <div className="columns is-mobile">
                <div className="column is-1" style={{display:'flex', alignItems:'center', backgroundColor:'#080808'}}
                onClick={()=>dispatch(handleTranslate(-1))}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </div>
                <div className="column is-10" >
                    {displayedModel}
                </div>
                <div className="column is-1" style={{display:'flex', alignItems:'center', backgroundColor:'#080808'}}
                onClick={()=>dispatch(handleTranslate(1))}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </div>
            </div>
            <div style={{display:'flex', justifyContent: 'center'}}>
                <TutorialLink link={TUTORIAL_KEYS.Timeline}/>
            </div>
        </div>


    return (
        
            isFeatureImplemented
            ? modelPanel
            : <></>
    )
}

export default StimPatternModel