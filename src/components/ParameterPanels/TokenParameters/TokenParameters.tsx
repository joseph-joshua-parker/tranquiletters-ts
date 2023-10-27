//React & Redux API
import { useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";

//Redux & Context
import NumParamChangeHandlerContext from "../../../contexts/NumParamChangeHandlerContext";
import { setName, setTokens } from "../../../state/redux/tokenSetParameterSlice";
import { crementNumParameter, modifyNumParameters  } from "../../../state/redux/tokenNumParameterSlice";

//Views & Components
import NumParameterInput from "../../NumParameterInput/NumParameterInput";
import StringParameterInput from "../../StringParamInput/StringParameterInput";

const TokenParameters = ()=>{
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
            
            <StringParameterInput isMultiline={false} name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput isMultiline={false}  name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
        </NumParamChangeHandlerContext.Provider>
    )
}

export default TokenParameters