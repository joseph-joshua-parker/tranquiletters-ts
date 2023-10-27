import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumActionPayload } from "../../shared/models/actionsPayload";
import { TOKEN_NUM_PARAMS } from "../../shared/models/parameters";



const initialState = {
        'Tokens/Cluster': 10,
        'Silence/Tokens': 2,
        'Silence/Clusters': 10,
        'SessionTime': 10
  
};

const tokenNumParameterSlice = createSlice({
    name: 'tokenParameters',
    initialState,
    reducers: {
        modifyNumParameters(state, action: PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            if(action.payload.val <= 0) return;
            state[name as TOKEN_NUM_PARAMS]  = val;
        },

        crementNumParameter(state, action:PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            state[name as TOKEN_NUM_PARAMS]  = state[name as TOKEN_NUM_PARAMS]+ val;
        },


        
    }
})

export const {modifyNumParameters, crementNumParameter} = tokenNumParameterSlice.actions;
export default tokenNumParameterSlice.reducer;
