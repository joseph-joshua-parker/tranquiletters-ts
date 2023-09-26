import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumParameterState } from "../shared/models/parameters";
import { NUM_PARAMS } from "../shared/models/parameters";
import { NumActionPayload } from "../shared/models/actionsPayload";



const initialState = {
        [NUM_PARAMS.TokensPerCluster]: 10,
        [NUM_PARAMS.SecondsBetweenTokens]: 2,
        [NUM_PARAMS.SecondsBetweenClusters]: 10
  
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
        }

        
    }
})

export const {modifyNumParameters, crementNumParameter} = numParameterSlice.actions;
export default numParameterSlice.reducer;
