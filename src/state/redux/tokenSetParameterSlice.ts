import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TokenSetParameterState, defaultStringParams } from '../../shared/models/parameters';

const tokenSetParameterSlice = createSlice({
    name: 'setParameters',
    initialState: defaultStringParams as TokenSetParameterState,
    reducers: {
        setName(state, action: PayloadAction<string>){
            state['Name'] = action.payload;
        },

        setTokens(state, action: PayloadAction<string>){
            state['Tokens'] = action.payload.split(' ');
        }
    }
})

export const {setName, setTokens} = tokenSetParameterSlice.actions;
export default tokenSetParameterSlice.reducer;