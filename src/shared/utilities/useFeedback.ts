import { MutableRefObject, useRef } from 'react';
import useSound from 'use-sound';

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

    const askQuestion = ()=>{
        playQuestion();
        pendingQuestion.current =  setTimeout(()=>{
            playStrike();
            strikeCount.current++;
        }, feedbackTime*1000)
    }

    const answerQuestion = ()=>{
        clearTimeout(pendingQuestion.current);
        pendingQuestion.current = undefined;

        playSmallHit();
        hitTime.current += feedbackTime;
    }

    return {askQuestion, answerQuestion, strikeCount, hitTime};
}

export default useFeedback