import { useRef } from 'react';
import useSound from 'use-sound';
import useCommandRecognition from '../../audio/recognition/useCommandRecognition';
import SpeechRecognition from 'react-speech-recognition';

const question = require('../../assets/soundFX/question.wav');
const smallHit = require('../../assets/soundFX/small_hit.wav');
const largeHit = require('../../assets/soundFX/large_hit.wav');
const strike = require('../../assets/soundFX/small_strike.wav');


const useFeedback = (feedbackTime: number)=>{
    const [playQuestion] = useSound(question); 
    const [playSmallHit] = useSound(smallHit);
    const [playLargeHit] = useSound(largeHit);
    const [playStrike] = useSound(strike);
    const pendingQuestion = useRef<NodeJS.Timeout | undefined>();

    const strikeCount = useRef(0);
    const hitTime = useRef(0);

    const answerQuestion = ()=>{
        clearTimeout(pendingQuestion.current);
        pendingQuestion.current = undefined;

        playSmallHit();
        hitTime.current += feedbackTime;
    }

    const {transcript} = useCommandRecognition(answerQuestion);

    const askQuestion = ()=>{
        playQuestion();
        SpeechRecognition.startListening();
        pendingQuestion.current =  setTimeout(()=>{
            playStrike();
            strikeCount.current++;
        }, feedbackTime*1000)
    }



    return {askQuestion, answerQuestion, strikeCount, hitTime};
}

export default useFeedback