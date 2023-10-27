import NumParameterInput from "../../NumParameterInput/NumParameterInput";

import { useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";


import { setName, setTokens } from "../../../state/redux/tokenSetParameterSlice";
import StringParameterInput from "../../StringParamInput/StringParameterInput";

import { crementNumParameter, modifyNumParameters  } from "../../../state/redux/tokenNumParameterSlice";
import NumParamChangeHandlerContext from "../../../contexts/NumParamChangeHandlerContext";

const TokenParameters = ()=>{
/*        */ 

    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters,
    } = useSelector((state:RootState)=>state.tokenNumParameterReducer)  
            
    const {
        ['Name']:   NameVal,
        ['Tokens']: TokensVal
    } = useSelector((state:RootState)=>state.tokenSetParameterReducer);




    
    return (
        <NumParamChangeHandlerContext.Provider value={{delta: crementNumParameter, modify: modifyNumParameters}}>
            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            
            <StringParameterInput name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
        </NumParamChangeHandlerContext.Provider>
    )
}

export default TokenParameters