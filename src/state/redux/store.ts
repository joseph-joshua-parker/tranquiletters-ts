import {configureStore, combineReducers} from '@reduxjs/toolkit';
import tokenNumParameterReducer from './tokenNumParameterSlice';
import tokenSetParameterReducer from './tokenSetParameterSlice';
import feedbackParameterReducer from './feedbackParameterSlice';
import stimToggleSliceReducer from './stimToggleSlice';
import soundEffectsReducer from './soundEffectsSlice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'day-wakers-widgets-v8',
    storage,
}

const rootReducer = combineReducers(
    {    
        tokenNumParameterReducer, 
        tokenSetParameterReducer,
        feedbackParameterReducer,
        stimToggleSliceReducer,
        soundEffectsReducer
    }
)

const persistedRootReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: {
        persistedRootReducer
    }
});

const persistedStore = persistStore(store)

export {persistedStore}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;