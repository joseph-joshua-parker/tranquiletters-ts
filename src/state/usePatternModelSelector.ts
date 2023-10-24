import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux";

import { PatternUnitModel, Silence, End} from "../shared/models/patternUnitModel";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./redux/store"

import { handleTranslate, initializeModel, setStim, toggleStim } from "./redux/stimToggleSlice";

const usePatternModelSelector = ()=>{

    const dispatch = useDispatch();
     const state = useSelector((state:RootState)=>{
        const {
            tokenSetParameterReducer:Set, 
            tokenNumParameterReducer: TokenParams, 
            feedbackParameterReducer: FeedbackParams,
            stimToggleSliceReducer: StimToggle
        } = state;
         const {
            ['Tokens/Cluster']: TPC, 
            ['Silence/Tokens']: SBT,
            ['Silence/Clusters']: SBC,
            ['Position']: Translation,
            ['SessionTime']: SessionTime
        } = TokenParams

        const {
            ['Tokens']:Tokens, 
            ['Name']: Name
        } = Set;

        const {
            patternModel,
            currentStimType
        } = StimToggle;



        const {feedbackAt} = FeedbackParams;



        const selectToken = ()=>{
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }

        const modelLength = TPC*SBT+SBC

        dispatch(initializeModel(modelLength));

        //Add Tokens
        for(let i=0; i<modelLength; i++){
            if( i < TPC*SBT && i % SBT == 0)    dispatch(setStim({index:i, type:STIM_TYPES.Token}))
            else                                dispatch(setStim({index: i, type: STIM_TYPES.Silence}))
        }

                        

        //Add Feedback
        feedbackAt.forEach(index => dispatch(setStim({index, type:STIM_TYPES.Feedback})));

        //Translate
        dispatch(handleTranslate(Translation));


        dispatch(capOff());
        
        return [SessionTime, selectToken] as [number, ()=>string];
    })

    return state;
}

export default usePatternModelSelector;
        

        





