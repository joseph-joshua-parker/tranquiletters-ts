//React & Redux API
import { useDispatch, } from "react-redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "../../state/redux/store"

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

    const multiLineInput = <textarea className="is-small textarea" style={{width: '10rem', whiteSpace: 'pre-wrap'}} value={val} id={name} onChange={handleTextAreaChange} name={name}/>

    return (
        <div style={{justifyContent:'center'}} className="center-content vertical">
            <div className="center-content ">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control center-content ">
                {isMultiline
                ? multiLineInput
                : singleLineInput
                }
            </div>
        </div>
        
    )
}

export default StringParameterInput;