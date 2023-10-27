import {useSpeechRecognition} from 'react-speech-recognition';

const useCommandRecognition = (acceptAnswer: ()=>void)=>{

    const unpedantic = {
        matchInterim: true,
        isFuzzyMatch: true,
        callback: acceptAnswer,
        bestMatchOnly:true
    }

    const commands = [
        {command: 'okay', ...unpedantic}, 
        {command: 'got it', ...unpedantic}, 
        {command: 'right', ...unpedantic}, 
        {command: 'cool', ...unpedantic}, 
        {command: 'good', ...unpedantic}, 
    ]

    return useSpeechRecognition({commands});
}

export default useCommandRecognition;