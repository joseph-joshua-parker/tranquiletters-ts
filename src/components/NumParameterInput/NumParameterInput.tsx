import { useDispatch, } from "react-redux"
import { AppDispatch } from "../../state/redux/store"
import './NumParameterInputStyles.css';
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { NumActionPayload } from "../../shared/models/actionsPayload";



interface NumParameterProps {
    name: string,
    val: number,
    delta: ActionCreatorWithPayload<NumActionPayload>,
    modify: ActionCreatorWithPayload<NumActionPayload>
}



const NumParameterInput = ({name, val, delta, modify}: NumParameterProps)=>{
    const dispatch = useDispatch<AppDispatch>();


    const handleDelta = (val: number)=> dispatch(delta({name, val}));
    const handleModify = ((e:React.ChangeEvent<HTMLInputElement>)=> dispatch(modify({name, val:parseInt(e.target.value)})));


    return (

        <div className="center-content vertical">
            
            <div className="center-content">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control center-content horizontal">
                <button className="button is-small crement-button" id={`decrement-${name}`} type="button" onClick={()=>handleDelta(-1)}>-1</button>
                <input style={{width:'6rem'}} className=" is-small input " value={val} id={name} onChange={handleModify} type="number" name="tokensPerClus"/>
                <button className="button is-small crement-button" id={`increment-${name}`} type="button" onClick={()=>handleDelta(+1)}>+1</button>
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