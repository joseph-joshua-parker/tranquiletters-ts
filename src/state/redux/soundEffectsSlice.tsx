import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface SoundEffectsState {
    assetNames: string[],
    soundEffectAt: number[]
    currentSound: string
} 

const initialState: SoundEffectsState = {
    assetNames: ['effect_1.wav'],
    soundEffectAt: [] as number[],
    currentSound: 'effect_1.wav'
}

const soundEffectsSlice = createSlice({
    name: 'soundEffects',
    initialState,
    reducers: {
        uploadSound(state, action:PayloadAction<string>){

        },

        addSoundEffect(state, action: PayloadAction<number>){
            state.soundEffectAt.push(action.payload);
        },

        removeSoundEffect(state, action: PayloadAction<number>){
            state.soundEffectAt = state.soundEffectAt.filter(index => index != action.payload)
        }
    }

});

export const {uploadSound, addSoundEffect, removeSoundEffect} = soundEffectsSlice.actions;
export default soundEffectsSlice.reducer;

