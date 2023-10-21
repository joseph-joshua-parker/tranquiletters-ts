import { useDispatch, useSelector } from "react-redux"
import { NUM_PARAMS } from "../../shared/models/parameters"
import { AppDispatch, RootState } from "../../state/store"
import { modifyNumParameters, crementNumParameter } from "../../state/tokenNumParameterSlice"
import './NumParameterInputStyles.css';
import { Dispatch } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface NumParameterProps {
    name: NUM_PARAMS,
    val: number
    delta?: Function
}



const NumParameterInput = ({name, val, delta}: NumParameterProps)=>{
    const dispatch = useDispatch<AppDispatch>();
    const deltaAction = delta ?? crementNumParameter;


    const handleCrement = (val: number)=> dispatch(deltaAction({name, val}));
    const handleModify = (val: number)=> dispatch(modifyNumParameters({name, val}));


    return (

        <div className="center-content vertical">
            
            <div className="center-content">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control center-content horizontal">
                <button className="button is-small crement-button" id={`decrement-${name}`} type="button" onClick={()=>handleCrement(-1)}>-1</button>
                <input style={{width:'6rem'}} className=" is-small input " value={val} id={name} onChange={()=>{}} type="number" name="tokensPerClus"/>
                <button className="button is-small crement-button" id={`increment-${name}`} type="button" onClick={()=>handleCrement(+1)}>+1</button>
            </div>
        </div>
        
    )
}

const paramStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center'
}



export default NumParameterInput;