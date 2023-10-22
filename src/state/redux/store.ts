import {configureStore} from '@reduxjs/toolkit';
import tokenNumParameterReducer from './tokenNumParameterSlice';
import tokenSetParameterReducer from './tokenSetParameterSlice';

export const store = configureStore({
    reducer: {tokenNumParameterReducer, tokenSetParameterReducer}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;