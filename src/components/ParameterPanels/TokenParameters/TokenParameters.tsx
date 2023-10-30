//React & Redux API
import { useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";

//Redux & Context
import NumParamChangeHandlerContext from "../../../contexts/NumParamChangeHandlerContext";
import { setName, setTokens } from "../../../state/redux/tokenSetParameterSlice";
import { crementNumParameter, modifyNumParameters  } from "../../../state/redux/tokenNumParameterSlice";

//Views & Components
import NumParameterInput from "../../ParameterInputFields/NumParameterInput/NumParameterInput";
import StringParameterInput from "../../ParameterInputFields/StringParamInput/StringParameterInput";
import { TUTORIAL_KEYS } from "../../../shared/tutorialData";

const TokenParameters = ()=>{
    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters,
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenNumParameterReducer)  
            
    const {
        ['Name']:   NameVal,
        ['Tokens']: TokensVal
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenSetParameterReducer);




    
    return (
        <NumParamChangeHandlerContext.Provider value={{delta: crementNumParameter, modify: modifyNumParameters}}>
            <div >
                <StringParameterInput link={TUTORIAL_KEYS.SpeakTheseTokens} isMultiline={false}  name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
                <NumParameterInput link={TUTORIAL_KEYS.TokensPerCluster} name={'Tokens/Cluster'} val={TokensPerCluster}/>
                <NumParameterInput link={TUTORIAL_KEYS.SilenceBetweenTokens} name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
                <NumParameterInput link={TUTORIAL_KEYS.SilenceBetweenClusters} name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            </div>
        </NumParamChangeHandlerContext.Provider>
    )
}

export default TokenParameters