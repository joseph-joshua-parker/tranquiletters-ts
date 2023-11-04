import { useEffect, useRef } from 'react';
import useSound from 'use-sound';
import useCommandRecognition from '../../audio/recognition/useCommandRecognition';
import SpeechRecognition from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { setStim } from '../../state/redux/stimToggleSlice';
import { removeFeedback } from '../../state/redux/feedbackParameterSlice';
import { removeToken } from '../../state/redux/tokenNumParameterSlice';
import { RootState } from '../../state/redux/store';
import { STIM_TYPES } from '../models/stimTypes';
import soundEffectsSlice, { removeSoundEffect } from '../../state/redux/soundEffectsSlice';

const question = require('../../assets/soundFX/question.wav');
const smallHit = require('../../assets/soundFX/small_hit.wav');
const largeHit = require('../../assets/soundFX/large_hit.wav');
const strike = require('../../assets/soundFX/small_strike.wav');

interface FeedbackParameters {
    feedbackTime: number, 
    acknowledgementsAccepted: string[], 
    hitUpgradeThreshold: number,
    strikeThreshold: number,
    isVocal: boolean,
    isAdaptive: boolean,
    notifyUser: (message:string, isContinuing: boolean)=>void,
    cancel: ()=>void
}

const useFeedback = ({
    feedbackTime, acknowledgementsAccepted, hitUpgradeThreshold, strikeThreshold, isVocal, isAdaptive,
    notifyUser, cancel
}:FeedbackParameters)=>{
    const dispatch = useDispatch();
    const {
        feedbackParameterReducer : {feedbackAt},
        tokenNumParameterReducer : {tokensAt},
        soundEffectsReducer: {soundEffectsAt}
    } = useSelector((state:RootState)=>state.persistedRootReducer);
    
    const [playQuestion] = useSound(question); 
    const [playSmallHit] = useSound(smallHit);
    const [playLargeHit] = useSound(largeHit);
    const [playStrike] = useSound(strike);
    const pendingQuestion = useRef<NodeJS.Timeout | undefined>();

    const strikeCount = useRef(0);
    const hitTime = useRef(0);
    const hitCount = useRef(0);

    const answerQuestion = ()=>{
        if(pendingQuestion.current == undefined) return;
        clearTimeout(pendingQuestion.current);
        pendingQuestion.current = undefined;
        playSmallHit();
        hitTime.current += feedbackTime;
        hitCount.current++;
    }

    const divideStimsBy = (type: STIM_TYPES, factor: number)=>{ 

            const [stimsAt, removeStim] = (()=>{switch(type){
                case STIM_TYPES.Feedback: return [feedbackAt, removeFeedback]; 
                case STIM_TYPES.Token: return [tokensAt, removeToken]; 
                case STIM_TYPES.SoundFX: return [soundEffectsAt, removeSoundEffect]
                default: return [[], null]
            }})()
            console.log(tokensAt)
            console.log(stimsAt)
            console.log(removeStim)


            if(!(stimsAt.length > 1)) return; 
            const median = Math.trunc(stimsAt.length/factor);
            stimsAt.forEach((at, index)=>{
                if(at > median && removeStim) {
                    dispatch(removeStim(at));
                    dispatch(setStim({index: at, type: STIM_TYPES.Silence}));
                }
            })


        
    }

    useEffect(()=>{
        if(!isAdaptive) return;
        else if (hitCount.current >= hitUpgradeThreshold){
            playSmallHit();
            playLargeHit();
            notifyUser('Good focus detected, reducing stimulation', true);
            divideStimsBy(STIM_TYPES.Token, 2)
            divideStimsBy(STIM_TYPES.Feedback, 2)
             
          reset();
        }
      },[hitCount.current])

      if(strikeCount.current >= 3){
        notifyUser('Over excitedness detected; consider changing parameters', false);
        cancel();
      }

    const {transcript, listening} = useCommandRecognition(answerQuestion, acknowledgementsAccepted);

    const askQuestion = ()=>{
        playQuestion();
        if(isVocal) SpeechRecognition.startListening();
        pendingQuestion.current =  setTimeout(()=>{
            playStrike();
            strikeCount.current++;  
        }, feedbackTime*1000)
    }

    const reset = ()=>{
        strikeCount.current = 0;
        hitCount.current = 0;
        clearTimeout(pendingQuestion.current);
    }

    return {askQuestion, answerQuestion, reset, strikeCount, hitTime, hitCount};
}

export default useFeedback