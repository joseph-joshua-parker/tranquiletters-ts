import {configureStore} from '@reduxjs/toolkit';
import numParameterReducer from './numParameterSlice';
import stringParameterReducer from './stringParameterSlice';

export const store = configureStore({
    reducer: {numParameterReducer, stringParameterReducer}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;