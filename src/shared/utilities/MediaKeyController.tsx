import { useMediaSession } from '@mebtte/react-media-session';
import React, {useEffect, useRef } from 'react';
import useMediaKeyTapInterpreter from './useMediaKeyTapInterpreter';

const silence = require('../../assets/soundFX/silence.mp3');

interface MediaKeyControllerProps {

    wait: number
    onSingleTap: ()=>void,
    onDoubleTap: ()=>void
}


const MediaKeyController: React.FC<MediaKeyControllerProps> = ({ wait, onSingleTap, onDoubleTap})=>{
    const audio = useRef<HTMLAudioElement>(new Audio());



    const {interpretTap, tapCount,} = useMediaKeyTapInterpreter(audio, 500, onSingleTap, onDoubleTap);


    useMediaSession({
        title: 'Silence',
        artist: 'Nothing',
        album: 'Controller',
        artwork: [

        ],
        onPlay: interpretTap,
        });

    return (
        <audio controls={true} ref={audio} src={silence}></audio>
    )
}

export default MediaKeyController;