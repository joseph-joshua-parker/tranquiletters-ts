//React & Redux API
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";

//Redux & Context
import { setTokens, selectSet, addNewSet, removeSet } from "../../../state/redux/tokenSetParameterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


//Views & Components
import TokenSetView from "./TokenSetView";

const TokenParameters = ()=>{
    const {
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenNumParameterReducer)  
            
    const {
        currentlySelectedSet, tokenSets
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenSetParameterReducer);

    const dispatch = useDispatch();

    const [isAddingSet, setIsAddingSet] = useState(false);
    const toggleAddingSet = ()=>{
        setIsAddingSet(prev=>!prev);
    }

    const [pendingSetName, setPendingSetName] = useState('');
    const [pendingSetTokens, setPendingSetTokens] = useState('')

    const handleAddingSet = () => {
        setIsAddingSet(prev=>!prev);
        dispatch(addNewSet({setName: pendingSetName, tokens: pendingSetTokens.split(' ')}));
        setPendingSetName('');
        setPendingSetTokens('');
    }

    const tokensSet = tokenSets.find(set=>set.setName == currentlySelectedSet) 
    const tokens = tokensSet
                        ? tokensSet.tokens
                        : [];


    const tokenSetLabels = tokenSets.map(({setName})=>{
        return <span onClick={()=>dispatch(selectSet(setName))} className='tag is-small'>{setName}</span>
    })
    



    const triggerNewSetInput = <span className=" is-small " onClick={toggleAddingSet}>
       {!isAddingSet 
       ? <FontAwesomeIcon  style={{color:'dimgray'}}  icon={faPlus}></FontAwesomeIcon>
       : <FontAwesomeIcon  style={{color:'dimgray'}} icon={faMinus}></FontAwesomeIcon>
}
    </span>

    const newSetInput = <div>
        <label className="label is-medium" htmlFor={'Pending Set Name'}>Name</label>

        <input  style={{width:'10rem'}} className=" is-small input " 
                value={pendingSetName} onChange={e=>setPendingSetName(e.target.value)} 
                type="text"  name={'Pending Set Name'} id={'Pending Set Name'}  /> 

        <label className="label is-medium" htmlFor={'Pending Set Tokens'}>Tokens</label>
        <input  style={{width:'10rem'}} className=" is-small input " 
                value={pendingSetTokens} onChange={e=>setPendingSetTokens(e.target.value)} 
                type="text"  name={'Pending Set Tokens'} id={'Pending Set Tokens'}  />           
                    
        <button className="button is-small" onClick={handleAddingSet}>Submit</button>
    </div>


    
    return (
        <>
        {tokenSetLabels} {triggerNewSetInput}
        {currentlySelectedSet && <TokenSetView setName={currentlySelectedSet} tokens={tokens} />}
        {isAddingSet  && newSetInput}
        </>


                
              
    )
}

export default TokenParameters