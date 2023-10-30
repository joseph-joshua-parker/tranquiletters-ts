import { useEffect, useRef } from 'react';
import useSound from 'use-sound';
import useCommandRecognition from '../../audio/recognition/useCommandRecognition';
import SpeechRecognition from 'react-speech-recognition';
import { useDispatch } from 'react-redux';
import { crementNumParameter } from '../../state/redux/tokenNumParameterSlice';

const question = require('../../assets/soundFX/question.wav');
const smallHit = require('../../assets/soundFX/small_hit.wav');
const largeHit = require('../../assets/soundFX/large_hit.wav');
const strike = require('../../assets/soundFX/small_strike.wav');

interface FeedbackParameters {
    TPC:number,
    feedbackTime: number, 
    acknowledgementsAccepted: string[], 
    hitUpgradeThreshold: number,
    strikeThreshold: number,
    isVocal: boolean,
    isAdaptive: boolean,
    isReducingClusters: boolean,
    notifyUser: (message:string)=>void,
    spreadClusters: ()=>void,
    cancel: ()=>void
}

const useFeedback = ({
    feedbackTime, acknowledgementsAccepted, hitUpgradeThreshold, strikeThreshold, isVocal, isAdaptive, isReducingClusters, TPC,
    notifyUser, spreadClusters, cancel
}:FeedbackParameters)=>{
    const dispatch = useDispatch();
    
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

    useEffect(()=>{
        if(!isAdaptive) return;
        if(hitCount.current >= hitUpgradeThreshold){
            playSmallHit();
            playLargeHit()
          notifyUser('Good focus detected, reducing stimulation')
          if(isReducingClusters)
            spreadClusters();
          
          else if(TPC > 1) dispatch(crementNumParameter({name:'Tokens/Cluster', val:-Math.trunc(TPC/2)}))
          else spreadClusters();     
            
          reset();
        }
      },[hitCount.current])

      if(strikeCount.current >= 3){
        notifyUser('Over excitedness detected; consider changing parameters');
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