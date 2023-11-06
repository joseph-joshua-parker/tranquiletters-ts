
import { MutableRefObject, useEffect, useState } from 'react';
import { useTimeout } from 'usehooks-ts';

const useMediaKeyTapInterpreter = (audio: MutableRefObject<HTMLAudioElement>, wait:number, onSingleTap: ()=>void, onDoubleTap: ()=>void)=>{
    const [delay, setDelay] = useState<number | null>(null);
    const [isAwaitingSecondTap, setIsAwaitingSecondTap] = useState(false);
    const [tapCount, setTapCount] = useState(0);


    useEffect(()=>{
        if(tapCount == 1) onSingleTap();
        else if (tapCount == 2) onDoubleTap();
        setTapCount(0);
    },[tapCount])

    useTimeout(()=>{
        console.log('timed out')
        setTapCount(1);
        setIsAwaitingSecondTap(false);
        setDelay(null);
    }, delay)


    const interpretTap = ()=>{
        if(isAwaitingSecondTap) {
            setTapCount(2);
            setIsAwaitingSecondTap(false);
            setDelay(null);
        }

        else {
            setDelay(wait);
            setIsAwaitingSecondTap(true);
        }

        audio.current.pause();
    }

    return { interpretTap, tapCount};
}

export default useMediaKeyTapInterpreter