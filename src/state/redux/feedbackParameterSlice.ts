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
    increasesAccepted: string[],
    decreasesAccepted: string[],
    questionSound:string,
    hitSound: string,
    strikeSound:string,
    strikeCount: number,
    feedbackAt: number[],
    feedbackTime:number,
    onStrikeout: ON_STRIKEOUT
    hitUpgradeThreshold: 0
    isAdaptive: boolean,
    isVocal:boolean,
    isMediaKey: boolean,
    isGeneratingFeedback: boolean,
    isReducingClusters: boolean
}

export const DefaultFeedbackParameters = {
    acknowledgementsAccepted: ['yes', 'good', 'okay', 'right', 'got it'],
    increasesAccepted: ['increase', 'more'],
    decreasesAccepted: ['decrease', 'less'],
    questionSound: 'question.wav',
    hitSound: 'small_hit.wav',
    strikeSound: 'small_strike.wav',
    strikeThreshold: 3,
    feedbackAt: new Array<number>(),
    feedbackTime: 5,
    ON_STRIKEOUT: ON_STRIKEOUT.Cancel,
    hitUpgradeThreshold: 10,
    isAdaptive: false,
    isVocal: false,
    isMediaKey: false,
    isGeneratingFeedback: false,
    isReducingClusters: false
}

const feedbackParameterSlice = createSlice({
    name: 'feedbackParameters',
    initialState: DefaultFeedbackParameters,
    reducers: {
        addFeedback(state, action: PayloadAction<number>){
            const index = action.payload;
            const {feedbackAt} = state;
            if(feedbackAt.includes(index)) return;
            else state.feedbackAt.push(index);
            feedbackAt.sort();
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


        addAcceptedIncreases(state, action: PayloadAction<string>){
            state.increasesAccepted.push(action.payload);
        },

        modifyAcceptedIncreases(state, action: PayloadAction<string>){
            const increases = action.payload.split(',');
            state.increasesAccepted = increases;
        },

        removeAcceptedIncreases(state, action: PayloadAction<string>){
            state.increasesAccepted = state.increasesAccepted.filter(ack => ack != action.payload);
        },


        addAcceptedDecreases(state, action: PayloadAction<string>){
            state.decreasesAccepted.push(action.payload);
        },

        modifyAcceptedDecreases(state, action: PayloadAction<string>){
            const decreases = action.payload.split(',');
            state.decreasesAccepted = decreases;
        },

        removeAcceptedDecreases(state, action: PayloadAction<string>){
            state.decreasesAccepted = state.decreasesAccepted.filter(ack => ack != action.payload);
        },

        crementStrikeThreshold(state, action){
            state.strikeThreshold += action.payload
        },

        modifyStrikeThreshold(state, action){
            state.strikeThreshold = action.payload;
        },


        toggleAdaptation(state){state.isAdaptive = !state.isAdaptive},
        toggleVocal(state){state.isVocal = !state.isVocal;},
        toggleClusterReduction(state){state.isReducingClusters = !state.isReducingClusters;},
        toggleFeedbackGeneration(state){state.isGeneratingFeedback = !state.isGeneratingFeedback;},
        toggleMediaKey(state){state.isMediaKey = !state.isMediaKey;}
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

    addAcceptedIncreases,
    modifyAcceptedIncreases,
    removeAcceptedIncreases,

    addAcceptedDecreases,
    modifyAcceptedDecreases,
    removeAcceptedDecreases,

    crementStrikeThreshold,
    modifyStrikeThreshold,

    toggleAdaptation,
    toggleVocal,
    toggleClusterReduction,
    toggleFeedbackGeneration,
    toggleMediaKey

} = feedbackParameterSlice.actions;
export default feedbackParameterSlice.reducer; 
