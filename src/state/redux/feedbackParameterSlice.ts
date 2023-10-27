import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NumActionPayload } from "../../shared/models/actionsPayload";

export enum ON_STRIKEOUT {
    Adapt = 'adapt',
    Cancel = 'Over-excitedness detected',
    BackupSound = 'backup_sound'
}



export interface FeedbackParameterState {
    acknowledgementsAccepted: string[],
    questionSound:string,
    hitSound: string,
    strikeSound:string,
    strikeCount: number,
    feedbackAt: number[],
    feedbackTime:number,
    onStrikeout: ON_STRIKEOUT
    hitUpgradeThreshold: 0
    isAdaptive: boolean
}

export const DefaultFeedbackParameters = {
    acknowledgementsAccepted: ['yes', 'good', 'okay', 'right', 'got it'],
    questionSound: 'question.wav',
    hitSound: 'small_hit.wav',
    strikeSound: 'small_strike.wav',
    strikeCount: 3,
    feedbackAt: new Array<number>(),
    feedbackTime: 20,
    ON_STRIKEOUT: ON_STRIKEOUT.Cancel,
    hitUpgradeThreshold: 10,
    isAdaptive: false
}

const feedbackParameterSlice = createSlice({
    name: 'feedbackParameters',
    initialState: DefaultFeedbackParameters,
    reducers: {
        addFeedback(state, action: PayloadAction<number>){
            const index = action.payload;
            state.feedbackAt.push(index);
        },

        removeFeedback(state, action: PayloadAction<number>){
            const index = action.payload;
            state.feedbackAt = state.feedbackAt.filter(i=> i != index);
        },

        crementFeedbackTime(state, action: PayloadAction<NumActionPayload>){
            state.feedbackTime += action.payload.val;
        },

        crementHitUpgradeThreshold(state, action: PayloadAction<NumActionPayload>){
            state.hitUpgradeThreshold += action.payload.val;
        },

        addAcceptedAcknowledgement(state, action: PayloadAction<string>){
            state.acknowledgementsAccepted.push(action.payload);
        },

        modifyAcceptedAcknowledgements(state, action: PayloadAction<string>){
            const acknowledgements = action.payload.split(',');
            state.acknowledgementsAccepted = acknowledgements;
        },

        removeAcceptedAcknowledgement(state, action: PayloadAction<string>){
            state.acknowledgementsAccepted = state.acknowledgementsAccepted.filter(ack => ack != action.payload);
        },

        toggleAdaptation(state){
            state.isAdaptive = !state.isAdaptive
        }
    }
})

export const {
    addFeedback, 
    removeFeedback, 
    crementFeedbackTime, 
    crementHitUpgradeThreshold,
    addAcceptedAcknowledgement,
    removeAcceptedAcknowledgement, 
    modifyAcceptedAcknowledgements,
    toggleAdaptation

} = feedbackParameterSlice.actions;
export default feedbackParameterSlice.reducer; 
