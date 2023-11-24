const speaker = window.speechSynthesis;

const init = ()=>{
    const welcome = new SpeechSynthesisUtterance('Welcome');
    speaker.speak(welcome);
}

const speak = (token: string)=>{
    const utterance = new SpeechSynthesisUtterance(token);
    speaker.speak(utterance);
}

export {speak, init}