import { PropsWithChildren } from "react"
import { TUTORIAL_KEYS } from "../../shared/tutorialData"
import TutorialLink from "../TutorialLink"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"


interface BooleanParameterInputProps {
    switchHandler?: ActionCreatorWithoutPayload,
    state: boolean
    htmlMeta: string
    link: TUTORIAL_KEYS

}

const BooleanParameterInput: React.FC<PropsWithChildren<BooleanParameterInputProps>> = ({switchHandler, htmlMeta, state, children, link})=>{
    const dispatch = useDispatch();
    const handleSwitch = ()=>{
        if(switchHandler)   dispatch(switchHandler())
    }

    return (
        <div className="field">
            <input onChange={handleSwitch} id={htmlMeta} type="checkbox" name={htmlMeta} className="switch" checked={state}/>
            <label htmlFor={htmlMeta}>{children}</label>
            <TutorialLink link={link}/>
        </div>
    )
}

export default BooleanParameterInput;