//React & Redux API
import { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { RootState } from "./redux/store"

//Models & enums
import { STIM_TYPES } from "../shared/models/stimTypes";

//Redux
import { capOff, initializeModel, setStim} from "./redux/stimToggleSlice";


const usePatternModelSelector = (...args: any[])=>{

    const dispatch = useDispatch();
     const state = useSelector((state:RootState)=>state);
        const {
            tokenSetParameterReducer:Set, 
            tokenNumParameterReducer: TokenParams, 
            feedbackParameterReducer: FeedbackParams,
            stimToggleSliceReducer: StimToggle
        } = state

         const {
            ['Tokens/Cluster']: TPC, 
            ['Silence/Tokens']: SBT,
            ['Silence/Clusters']: SBC,
            ['SessionTime']: SessionTime
        } = TokenParams
    
        const {feedbackAt} = FeedbackParams;
        const modelLength = TPC*SBT+SBC

        useEffect(()=>{
            batch(()=>{
                dispatch(initializeModel(modelLength));
                //Add Tokens
                for(let i=0; i<modelLength; i++){
                    if( i < TPC*SBT && i % SBT == 0)    dispatch(setStim({index:i, type:STIM_TYPES.Token}))
                    else                                dispatch(setStim({index: i, type: STIM_TYPES.Silence}))
                }
        
                //Add Feedback
                feedbackAt.forEach(index => dispatch(setStim({index, type:STIM_TYPES.Feedback})));
        
        
                //Cap off
                dispatch(capOff());
            })
        }, [SBT, TPC, SBC, feedbackAt, modelLength, ...args])   
        
        
        
        return {SessionTime};
}

export default usePatternModelSelector;
        