import { useDispatch } from "react-redux";
import { TokenSet, setTokens, editSetName, removeSet } from "../../../state/redux/tokenSetParameterSlice";
import { useState } from "react";



const TokenSetView: React.FC<TokenSet> = ({setName, tokens})=>{
    const [isEditingName, setisEditingName] = useState(false);
    const [pendingName, setPendingName] = useState(setName);
    
    const dispatch = useDispatch();

    const handlePendingNameChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setPendingName(e.target.value);
    }

    const handleSetNameSubmit = () =>{
        dispatch(editSetName({prev: setName, next:pendingName}));
        setisEditingName(false);
    }

    return (
        <div style={{justifyContent:'center'}} className=" card center-content vertical">

                <div className='card-header'>
                    {!isEditingName  
                    && <label 
                     className="card-header-title is-medium center" htmlFor={setName}>{setName}
                    </label>
                    }
                </div>

                <div className="card-content">
                {!isEditingName 
                ?<input  style={{width:'10rem'}} className=" is-small input " 
                        value={tokens.join(' ')} id={setName} onChange={(e)=>dispatch(setTokens({setName, tokens:e.target.value.split(' ')}))} type="text"  name={setName}/>         
                : <div className='label center'>{tokens.join(' ')}</div>
                }
                {!isEditingName  
                ?  <div>
                     <button style={{width:'5rem'}} className="button is-small" 
                     onClick={()=>setisEditingName(true)}>
                        Edit Name
                    </button>

                     <button style={{width:'5rem'}} className="button is-small" 
                     onClick={()=>dispatch(removeSet(setName))}>
                        Delete
                    </button>
                   </div>

                :   <div className='center-content'>
                        <input  style={{width:'10rem'}} className=" is-small input "
                            value={pendingName} onChange={handlePendingNameChange}
                            type="text"  name={'New Set Name'} id={setName} />
                        <button onClick={handleSetNameSubmit} className='button is-small'>Submit</button>
                    </div>
                }

                </div>
        </div>
    )
}

export default TokenSetView;