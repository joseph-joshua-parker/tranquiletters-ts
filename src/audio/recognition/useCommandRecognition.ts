import { MutableRefObject } from 'react';
import {useSpeechRecognition} from 'react-speech-recognition';

const useCommandRecognition = (
    acceptAnswer: ()=>void, 
    decreaseStims: ()=>void,
    increaseStims: ()=>void,
    startSession: ()=>void,

    acknowledgementsAccepted: string[],
    increasesAccepted: string[],
    decreasesAccepted: string[],
    startsAccepted: string[],

    )=>{

    const unpedantic= {
        matchInterim: true,
        isFuzzyMatch: true,
        bestMatchOnly:true,
        fuzzyMatchingThreshold: 0.9,
    }
 
    const readyAcknowledgements = acknowledgementsAccepted.map(ack=>{
        return {
            command: ack,
            ...unpedantic,
            callback: acceptAnswer
        }
    })

    const readyDecreases = decreasesAccepted.map(dec=>{
        return {
            command: dec,
            ...unpedantic,
            callback: decreaseStims,
        }
    })

    
    const readyIncreases = increasesAccepted.map(inc=>{
        return {
            command: inc,
            ...unpedantic,
            callback: increaseStims,
        }
    })

    const readyStarts = startsAccepted.map(start=>{
        return { 
            command:start,
            ...unpedantic,
            callback: startSession
        }
    })

    const commands = [...readyAcknowledgements, ...readyDecreases, ...readyIncreases ]

    return useSpeechRecognition({commands});
}

export default useCommandRecognition;