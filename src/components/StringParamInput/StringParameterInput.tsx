//React & Redux API
import { useDispatch, } from "react-redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "../../state/redux/store"

//models & enums
import { STRING_PARAMS } from "../../shared/models/parameters"


interface StringParameterProps {
    name: string,
    val: string,
    isMultiline: boolean
    action: ActionCreatorWithPayload<string>
}



const StringParameterInput = ({name, val, action, isMultiline}: StringParameterProps)=>{

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(action(e.target.value));
    }

    const handleTextAreaChange = (e:  React.ChangeEvent<HTMLTextAreaElement>)=>{
        dispatch(action(e.target.value));
    }



    const singleLineInput = <input  style={{width:'10rem'}} className=" is-small input " value={val} id={name} onChange={handleInputChange} type="text"  name={name}/>

    const multiLineInput = <textarea style={{width: '10rem', whiteSpace: 'pre-wrap'}} value={val} id={name} onChange={handleTextAreaChange} name={name}/>

    return (
        <div className="center-content vertical">
            <div className="center-content ">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control ">
                {isMultiline
                ? multiLineInput
                : singleLineInput
                }
            </div>
        </div>
        
    )
}

export default StringParameterInput;