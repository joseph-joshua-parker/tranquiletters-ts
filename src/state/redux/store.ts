import {configureStore} from '@reduxjs/toolkit';
import tokenNumParameterReducer from './tokenNumParameterSlice';
import tokenSetParameterReducer from './tokenSetParameterSlice';
import feedbackParameterReducer from './feedbackParameterSlice';
import stimToggleSliceReducer from './stimToggleSlice';

export const store = configureStore({
    reducer: {
        tokenNumParameterReducer, 
        tokenSetParameterReducer,
        feedbackParameterReducer,
        stimToggleSliceReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;