//React & Redux API
import { useDispatch, } from "react-redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch } from "../../state/redux/store"

//models & enums
import { STRING_PARAMS } from "../../shared/models/parameters"


interface StringParameterProps {
    name: STRING_PARAMS,
    val: string,
    action: ActionCreatorWithPayload<string>
}


const StringParameterInput = ({name, val, action}: StringParameterProps)=>{

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(action(e.target.value));
    }

    return (
        <div className="center-content vertical">
            <div className="center-content ">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control ">
                <input  style={{width:'10rem'}} className=" is-small input " value={val} id={name} onChange={handleChange} type="text" name="tokensPerClus"/>
            </div>
        </div>
        
    )
}

export default StringParameterInput;