import {useSpeechRecognition} from 'react-speech-recognition';

const useCommandRecognition = (acceptAnswer: ()=>void, acknowledgementsAccepted: string[])=>{

    const unpedantic = {
        matchInterim: true,
        isFuzzyMatch: true,
        callback: acceptAnswer,
        bestMatchOnly:true
    }

    const readyAcknowledgements = acknowledgementsAccepted.map(ack=>{
        return {
            command: ack,
            ...unpedantic
        }
    })

    const commands = [...readyAcknowledgements ]

    return useSpeechRecognition({commands});
}

export default useCommandRecognition;