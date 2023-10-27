import { useRef } from 'react';
import useSound from 'use-sound';
import useCommandRecognition from '../../audio/recognition/useCommandRecognition';
import SpeechRecognition from 'react-speech-recognition';

const question = require('../../assets/soundFX/question.wav');
const smallHit = require('../../assets/soundFX/small_hit.wav');
const largeHit = require('../../assets/soundFX/large_hit.wav');
const strike = require('../../assets/soundFX/small_strike.wav');

interface FeedbackParameters {
    feedbackTime: number, 
    acknowledgementsAccepted: string[], 
    hitUpgradeThreshold: number
}

const useFeedback = ({feedbackTime, acknowledgementsAccepted, hitUpgradeThreshold}:FeedbackParameters)=>{
    const [playQuestion] = useSound(question); 
    const [playSmallHit] = useSound(smallHit);
    const [playLargeHit] = useSound(largeHit);
    const [playStrike] = useSound(strike);
    const pendingQuestion = useRef<NodeJS.Timeout | undefined>();

    const strikeCount = useRef(0);
    const hitTime = useRef(0);
    const hitCount = useRef(0);

    const answerQuestion = ()=>{
        clearTimeout(pendingQuestion.current);
        pendingQuestion.current = undefined;
        if(listening) SpeechRecognition.stopListening();
        SpeechRecognition.stopListening();
        playSmallHit();
        hitTime.current += feedbackTime;
        hitCount.current++;
    }

    const {transcript, listening} = useCommandRecognition(answerQuestion, acknowledgementsAccepted);

    const askQuestion = ()=>{
        playQuestion();
        SpeechRecognition.startListening();
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