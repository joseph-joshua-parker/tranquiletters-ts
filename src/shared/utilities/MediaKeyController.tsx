import { useMediaSession } from '@mebtte/react-media-session';
import React, {useCallback, useEffect, useRef } from 'react';
import useMediaKeyTapInterpreter from './useMediaKeyTapInterpreter';

const silence = require('../../assets/soundFX/silence.mp3');
const question = require('../../assets/soundFX/question.wav');

interface MediaKeyControllerProps {

    wait: number
    onSingleTap: ()=>void,
    onDoubleTap: ()=>void
}


const MediaKeyController: React.FC<MediaKeyControllerProps> = ({ wait, onSingleTap, onDoubleTap})=>{
    const audio = useRef<HTMLAudioElement>(new Audio());


    const initialize = useCallback((node: HTMLAudioElement)=>{
        if(node != null) node.play();
    }, [])


    const {interpretTap, tapCount,} = useMediaKeyTapInterpreter(audio, 1500, onSingleTap, onDoubleTap);


    useMediaSession({
        title: 'Silence',
        artist: 'Nothing',
        album: 'Controller',
        artwork: [

        ],
        onPlay: interpretTap,
        });

    return (
        <audio  ref={initialize} src={silence}></audio>
    )
}

export default MediaKeyController;