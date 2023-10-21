import NumParameterInput from "../NumParameterInput/NumParameterInput";

import { useSelector } from "react-redux";
import {  RootState } from "../../state/store";


import { setName, setTokens } from "../../state/tokenSetParameterSlice";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import { translate } from "../../state/tokenNumParameterSlice";


const VerbalParameters = ()=>{
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
    
    return (
        <>
            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            <NumParameterInput name={'Position'} val={Position} delta={translate}/>
            
            <StringParameterInput name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
        </>
    )
}

export default VerbalParameters