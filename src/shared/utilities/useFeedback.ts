import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import useCommandRecognition from '../../audio/recognition/useCommandRecognition';
import SpeechRecognition from 'react-speech-recognition';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedback, crementTodaysProgress, removeFeedback } from '../../state/redux/feedbackParameterSlice';
import { addToken, removeToken } from '../../state/redux/tokenNumParameterSlice';
import { RootState } from '../../state/redux/store';
import { STIM_TYPES } from '../models/stimTypes';
import soundEffectsSlice, { addSoundEffect, removeSoundEffect } from '../../state/redux/soundEffectsSlice';

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
    feedbackTime, acknowledgementsAccepted, hitUpgradeThreshold, isVocal, isAdaptive,
    notifyUser, cancel
}:FeedbackParameters)=>{
    const dispatch = useDispatch();
    const {
        feedbackParameterReducer : {feedbackAt, increasesAccepted, decreasesAccepted, strikeThreshold},
        tokenNumParameterReducer : {tokensAt},
        soundEffectsReducer: {soundEffectsAt},
        stimToggleSliceReducer: {patternModel}
    } = useSelector((state:RootState)=>state.persistedRootReducer);
    
    const [playQuestion] = useSound(question); 
    const [playSmallHit] = useSound(smallHit);
    const [playLargeHit] = useSound(largeHit);
    const [playStrike] = useSound(strike);
    const pendingQuestion = useRef<NodeJS.Timeout | undefined>();

    const feedbackAgo = useRef(0);

    const strikeCount = useRef(0);
    const hitTime = useRef(0);
    const [hitCount, setHitCount] = useState(0);
    const results = useRef(0);
    const patternModelLength = useRef(patternModel.length);
    const stimLength = useRef(0);

    const answerQuestion = ()=>{
        if(pendingQuestion.current == undefined) return;

        dispatch(crementTodaysProgress(feedbackAgo.current));
        feedbackAgo.current = 0;
        clearTimeout(pendingQuestion.current);
        SpeechRecognition.stopListening();
        pendingQuestion.current = undefined;
        playSmallHit();
        hitTime.current += feedbackTime;
        setHitCount(prev=>++prev);
    }

    const divideStimsBy = (type: STIM_TYPES, factor: number)=>{ 

            const [stimsAt, removeStim] = (()=>{switch(type){
                case STIM_TYPES.Feedback: return [feedbackAt, removeFeedback]; 
                case STIM_TYPES.Token: return [tokensAt, removeToken]; 
                case STIM_TYPES.SoundFX: return [soundEffectsAt, removeSoundEffect]
                default: return [[] as number[], null]
            }})()



            if(!(stimsAt.length > 0)) return; 

            const median = Math.trunc(stimsAt.length/factor);
            console.log(median);

            stimsAt.forEach((at, index)=>{
                if(index+1 > median && removeStim) {
                    dispatch(removeStim(at));
                }
            })        
    }

    const increaseStims  = ()=>{
        if(results.current > 0) return;
        console.log(results.current);
        results.current++;
        incrementStims(STIM_TYPES.Token);
        notifyUser('Increasing tokens', true);
        reset();
    }

    const incrementStims = (type: STIM_TYPES)=>{
        const [stimsAt, addStim] = (()=>{switch(type){
            //case STIM_TYPES.Feedback: return [feedbackAt, addFeedback]; 
            case STIM_TYPES.Token: return [tokensAt, addToken]; 
            case STIM_TYPES.SoundFX: return [soundEffectsAt, addSoundEffect]
            default: return [[], null]
        }})()

        stimLength.current = stimsAt.length;
        for(let i=0; i< stimLength.current; i++){
            const at = stimsAt[i];  
            if((i < patternModel.length-1) && addStim){
                dispatch(addStim(at+1));

            } 
        }
    }   

    function decreaseStims(){
        if(results.current > 0) return;
        results.current++;
        divideStimsBy(STIM_TYPES.Token, 2)
        notifyUser('Decreasing tokens', true);
        reset();
    }

    useEffect(()=>{
        console.log(isAdaptive)
        if(!isAdaptive) return;
        else if (hitCount >= hitUpgradeThreshold){
            playSmallHit();
            playLargeHit();
            notifyUser('Good focus detected, decreasing tokens', true);
            decreaseStims();
             
          reset();
        }
      },[hitCount])

      if(strikeCount.current >= strikeThreshold){
        notifyUser('Are you focused? No interaction detected', false);
        reset();

      }

    const {transcript, listening} = useCommandRecognition(
        answerQuestion, 
        decreaseStims,
        increaseStims,
   

        acknowledgementsAccepted,
        increasesAccepted,
        decreasesAccepted,

        );

    const seekCommand = ()=> {
        SpeechRecognition.startListening();
    }

    const askQuestion = ()=>{
        playQuestion();
        if(isVocal) SpeechRecognition.startListening();
        pendingQuestion.current =  setTimeout(()=>{
            playStrike();
            strikeCount.current++;  
            feedbackAgo.current = 0;
        }, feedbackTime*1000)
    }

    function reset(){
        strikeCount.current = 0;
        setHitCount(0);
        clearTimeout(pendingQuestion.current);
        setTimeout(()=>results.current = 0, 1000);
    }

    return {askQuestion, seekCommand, answerQuestion, reset, feedbackAgo, strikeCount, hitTime, hitCount};
}

export default useFeedback