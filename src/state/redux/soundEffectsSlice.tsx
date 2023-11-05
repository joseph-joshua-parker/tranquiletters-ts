import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist";

interface SoundEffectsState {
    assetNames: string[],
    soundEffectsAt: number[]
    currentSound: string
} 

const initialState: SoundEffectsState = {
    assetNames: ['effect_1.wav'],
    soundEffectsAt: [] as number[],
    currentSound: 'effect_1.wav'
}

const soundEffectsSlice = createSlice({
    name: 'soundEffects',
    initialState,
    reducers: {
        uploadSound(state, action:PayloadAction<string>){

        },

        addSoundEffect(state, action: PayloadAction<number>){
            const index = action.payload;
            const {soundEffectsAt} = state;
            if(soundEffectsAt.includes(index)) return;
            else soundEffectsAt.push(index);
            soundEffectsAt.sort();
        },

        removeSoundEffect(state, action: PayloadAction<number>){
            state.soundEffectsAt = state.soundEffectsAt.filter(index => index != action.payload)
        },

        clearAllSoundEffects(state){
            state.soundEffectsAt = [] as number[];
        }
    },

    extraReducers: 
    (builder)=> { builder.addCase(PURGE, state=> initialState)}

});

export const {uploadSound, addSoundEffect, removeSoundEffect, clearAllSoundEffects} = soundEffectsSlice.actions;
export default soundEffectsSlice.reducer;

