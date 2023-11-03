//React & Redux API
import { useDispatch, useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";

//Redux & Context
import { setTokens, selectSet, addNewSet, removeSet } from "../../../state/redux/tokenSetParameterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


//Views & Components


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

    const tokens = tokenSets.find(set=>set.setName == currentlySelectedSet)?.tokens;


    const tokenSetLabels = tokenSets.map(({setName})=>{
        return <span onClick={()=>dispatch(selectSet(setName))} className='tag is-small'>{setName}</span>
    })
    
    const chosenTokenSet = 

            <div style={{justifyContent:'center'}} className=" card center-content vertical">
                    <div className=" center-content ">
                        <label className="card-header-title label is-medium" htmlFor={currentlySelectedSet}>{currentlySelectedSet}</label>
                        <div className="card-content">
                        <input  style={{width:'10rem'}} className=" is-small input " 
                                value={tokens!.join(' ')} id={currentlySelectedSet} onChange={(e)=>dispatch(setTokens({setName:currentlySelectedSet, tokens:e.target.value.split(' ')}))} type="text"  name={currentlySelectedSet}/>         
                        </div>
                    </div>
                </div>

    const triggerNewSetInput = <label className="label is-medium" onClick={toggleAddingSet}>
        New Set <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
    </label>

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
        <div>
        {tokenSetLabels}
        {chosenTokenSet}
        {isAddingSet  
            ? newSetInput
            : triggerNewSetInput
        }
        </div>


                
              
    )
}

export default TokenParameters