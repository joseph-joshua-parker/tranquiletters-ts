const speaker = window.speechSynthesis;

const init = ()=>{
    const silence = new SpeechSynthesisUtterance('');
    speaker.speak(silence);
}

const speak = (token: string)=>{
    const utterance = new SpeechSynthesisUtterance(token);
    speaker.speak(utterance);
}

export {speak, init}