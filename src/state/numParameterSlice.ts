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

const numParameterSlice = createSlice({
    name: 'numParameters',
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

        translate(state, action: PayloadAction<number>){
            const translation = action.payload;
            state['Position'] += translation;
        }

        
    }
})

export const {modifyNumParameters, crementNumParameter} = numParameterSlice.actions;
export default numParameterSlice.reducer;
