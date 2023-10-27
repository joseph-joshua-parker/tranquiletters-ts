//React & Redux API
import { useContext } from "react";
import { useDispatch, } from "react-redux"
import { AppDispatch } from "../../state/redux/store"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

//Models & enums
import { NumActionPayload } from "../../shared/models/actionsPayload";

//Context
import NumParamChangeHandlerContext from "../../contexts/NumParamChangeHandlerContext";

//Styles
import './NumParameterInputStyles.css';


interface NumParameterProps {
    name: string,
    val: number,
    propDelta?: ActionCreatorWithPayload<NumActionPayload>,
    propModify?: ActionCreatorWithPayload<NumActionPayload>
}



const NumParameterInput = ({name, val, propDelta, propModify}: NumParameterProps)=>{
    const dispatch = useDispatch<AppDispatch>();
    const {delta, modify} = useContext(NumParamChangeHandlerContext); 

    const trueDelta = delta ?? propDelta;
    const trueModify = modify ?? propModify;

    const handleDelta = (val: number)=> dispatch(trueDelta({name, val}));
    const handleModify = ((e:React.ChangeEvent<HTMLInputElement>)=> dispatch(trueModify({name, val:parseInt(e.target.value)})));

    const deltaFactor = val >=4 ? Math.trunc(val/2) : 2;
    const displayMinusFactorDelta = val > 2;
    const displayMinusDelta = val > 1;

    return (

        <div className="center-content vertical">
            
            <div className="center-content">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control center-content horizontal">
                {displayMinusFactorDelta &&
                    <button className="button is-small crement-button" id={`factor-decrement-${name}`} type="button" onClick={()=>handleDelta(-deltaFactor)}>-{deltaFactor}</button>
                }

                {displayMinusDelta &&
                    <button className="button is-small crement-button" id={`decrement-${name}`} type="button" onClick={()=>handleDelta(-1)}>-1</button>
                }
                <input style={{width:'6rem'}} className=" is-small input " value={val} id={name} onChange={handleModify} type="number" name="tokensPerClus"/>
                <button className="button is-small crement-button" id={`increment-${name}`} type="button" onClick={()=>handleDelta(+1)}>+1</button>
                <button className="button is-small crement-button" id={`factor-increment-${name}`} type="button" onClick={()=>handleDelta(deltaFactor)}>+{deltaFactor}</button>

            </div>
        </div>
        
    )
}

export default NumParameterInput;