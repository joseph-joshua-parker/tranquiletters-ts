import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum ON_STRIKEOUT {
    Adapt = 'adapt',
    Cancel = 'Over-excitedness detected',
    BackupSound = 'backup_sound'
}

export interface FeedbackParameterState {
    questionSound:string,
    hitSound: string,
    strikeSound:string,
    strikeCount: number,
    feedbackAt: number[],
    feedbackTime:number,
    onStrikeout: ON_STRIKEOUT
}

export const DefaultFeedbackParameters = {
    questionSound: 'question.wav',
    hitSound: 'small_hit.wav',
    strikeSound: 'small_strike.wav',
    strikeCount: 3,
    feedbackAt: new Array<number>(),
    feedbackTime: 20,
    ON_STRIKEOUT: ON_STRIKEOUT.Cancel

}

const feedbackParameterSlice = createSlice({
    name: 'feedbackParameters',
    initialState: DefaultFeedbackParameters,
    reducers: {
        addFeedback(state, action: PayloadAction<number>){
            const index = action.payload;
            console.log('dfg');
            state.feedbackAt.push(index);
        },

        removeFeedback(state, action: PayloadAction<number>){
            const index = action.payload;
            state.feedbackAt = state.feedbackAt.filter(i=> i != index);
        },

        crementFeedbackTime(state, action: PayloadAction<number>){
            state.feedbackTime = action.payload;
        }
    }
})

export const {addFeedback, removeFeedback, crementFeedbackTime} = feedbackParameterSlice.actions;
export default feedbackParameterSlice.reducer; 
