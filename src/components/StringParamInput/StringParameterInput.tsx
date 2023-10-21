import { useDispatch, } from "react-redux"
import { STRING_PARAMS } from "../../shared/models/parameters"
import { AppDispatch, RootState } from "../../state/store"
import {setName, setTokens } from "../../state/tokenSetParameterSlice"
import './StringParameterInputStyles.css';
import { Dispatch } from "redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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

const paramStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center'
}



export default StringParameterInput;