import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { STRING_PARAMS, StringParameterState, defaultStringParams } from '../shared/models/parameters';

const stringParameterSlice = createSlice({
    name: 'stringParameters',
    initialState: defaultStringParams as StringParameterState,
    reducers: {
        setName(state, action: PayloadAction<string>){
            state[STRING_PARAMS.Name] = action.payload;
        },

        setTokens(state, action: PayloadAction<string>){
            state[STRING_PARAMS.Tokens] = action.payload.split(' ');
        }
    }
})

export const {setName, setTokens} = stringParameterSlice.actions;
export default stringParameterSlice.reducer;