import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NumActionPayload } from "../../shared/models/actionsPayload";
import { PURGE } from "redux-persist";

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
    isAdaptive: boolean,
    isVocal:boolean
    isGeneratingFeedback: boolean,
    isReducingClusters: boolean
}

export const DefaultFeedbackParameters = {
    acknowledgementsAccepted: ['yes', 'good', 'okay', 'right', 'got it'],
    questionSound: 'question.wav',
    hitSound: 'small_hit.wav',
    strikeSound: 'small_strike.wav',
    strikeCount: 3,
    feedbackAt: new Array<number>(),
    feedbackTime: 5,
    ON_STRIKEOUT: ON_STRIKEOUT.Cancel,
    hitUpgradeThreshold: 10,
    isAdaptive: false,
    isVocal: false,
    isGeneratingFeedback: false,
    isReducingClusters: false
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

        clearAllFeedback(state){
            state.feedbackAt = [] as number[]
        },

        crementFeedbackTime(state, action: PayloadAction<number>){
            state.feedbackTime += action.payload;
        },

        
        modifyFeedbackTime(state, action: PayloadAction<number>){
            state.feedbackTime = action.payload;
        },

        crementHitUpgradeThreshold(state, action: PayloadAction<number>){
            state.hitUpgradeThreshold += action.payload;
        },

        modifyHitUpgradeThreshold(state, action: PayloadAction<number>){
            state.hitUpgradeThreshold = action.payload;
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

        toggleAdaptation(state){state.isAdaptive = !state.isAdaptive},
        toggleVocal(state){state.isVocal = !state.isVocal;},
        toggleClusterReduction(state){state.isReducingClusters = !state.isReducingClusters;},
        toggleFeedbackGeneration(state){state.isGeneratingFeedback = !state.isGeneratingFeedback;}
    },

    extraReducers: 
    (builder)=> { builder.addCase(PURGE, ()=> DefaultFeedbackParameters)}
})

export const {
    addFeedback, 
    removeFeedback, 
    clearAllFeedback,
    
    crementFeedbackTime,
    modifyFeedbackTime, 
    crementHitUpgradeThreshold,
    modifyHitUpgradeThreshold,
    addAcceptedAcknowledgement,
    removeAcceptedAcknowledgement, 
    modifyAcceptedAcknowledgements,
    toggleAdaptation,
    toggleVocal,
    toggleClusterReduction,
    toggleFeedbackGeneration

} = feedbackParameterSlice.actions;
export default feedbackParameterSlice.reducer; 
