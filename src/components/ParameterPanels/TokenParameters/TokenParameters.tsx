import NumParameterInput from "../../NumParameterInput/NumParameterInput";

import { useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";


import { setName, setTokens } from "../../../state/redux/tokenSetParameterSlice";
import StringParameterInput from "../../StringParamInput/StringParameterInput";

import { crementTranslate, crementNumParameter, modifyNumParameters  } from "../../../state/redux/tokenNumParameterSlice";
import NumParamChangeHandlerContext from "../../../contexts/NumParamChangeHandlerContext";

const TokenParameters = ()=>{
/*        */ 

    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters,
        ['Position']: Position
    } = useSelector((state:RootState)=>state.tokenNumParameterReducer)  
            
    const {
        ['Name']:   NameVal,
        ['Tokens']: TokensVal
    } = useSelector((state:RootState)=>state.tokenSetParameterReducer);


    const ChangleHandlerContext = NumParamChangeHandlerContext;
    
    return (
        <ChangleHandlerContext.Provider value={{delta: crementNumParameter, modify: modifyNumParameters}}>
            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            <NumParameterInput name={'Position'} val={Position} propDelta={crementTranslate}/>
            
            <StringParameterInput name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
        </ChangleHandlerContext.Provider>
    )
}

export default TokenParameters