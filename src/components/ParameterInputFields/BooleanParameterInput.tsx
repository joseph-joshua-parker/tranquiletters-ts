import { PropsWithChildren } from "react"
import { TUTORIAL_KEYS } from "../../shared/tutorialData"
import TutorialLink from "../TutorialLink"
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


interface BooleanParameterInputProps {
    dispatchHandler?: ActionCreatorWithoutPayload,
    setStateHandler?: ()=>void,
    state: boolean
    htmlMeta: string
    link: TUTORIAL_KEYS


}

const BooleanParameterInput: React.FC<PropsWithChildren<BooleanParameterInputProps>> = ({dispatchHandler, setStateHandler, htmlMeta, state, children, link})=>{
    const dispatch = useDispatch();
    const handleSwitch = ()=>{
        if(dispatchHandler)   dispatch(dispatchHandler())
        else if(setStateHandler) setStateHandler();
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