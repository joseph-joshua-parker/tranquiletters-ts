import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumParameterState } from "../shared/models/parameters";
import { NUM_PARAMS } from "../shared/models/parameters";
import { NumActionPayload } from "../shared/models/actionsPayload";



const initialState = {
        'Tokens/Cluster': 10,
        'Silence/Tokens': 2,
        'Silence/Clusters': 10,
        'Position': 0
  
};

const tokenNumParameterSlice = createSlice({
    name: 'tokenParameters',
    initialState,
    reducers: {
        modifyNumParameters(state, action: PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            state[name]  = val;
        },

        crementNumParameter(state, action:PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            state[name]  = state[name]+ val;
        },

        translate(state, action: PayloadAction<NumActionPayload>){
            const {name, val} = action.payload;
            const {
                ['Tokens/Cluster']: TPC, 
                ['Silence/Tokens']: SBT,
                ['Silence/Clusters']: SBC,
            } = state;

            const totalLength = TPC*SBT+SBC;


            const newPosition = state['Position'] + val;
            if(! (newPosition + TPC*SBT > totalLength) && newPosition > 0)
                state['Position'] = newPosition;
        }

        
    }
})

export const {modifyNumParameters, crementNumParameter, translate} = tokenNumParameterSlice.actions;
export default tokenNumParameterSlice.reducer;
