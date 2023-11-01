//React & Redux API
import { useSelector } from "react-redux";
import {  RootState } from "../../../state/redux/store";

//Redux & Context
import { setTokens } from "../../../state/redux/tokenSetParameterSlice";
import { crementSBT, crementTPC, modifySBT, modifyTPC  } from "../../../state/redux/tokenNumParameterSlice";

//Views & Components
import NumParameterInput from "../../ParameterInputFields/NumParameterInput/NumParameterInput";
import StringParameterInput from "../../ParameterInputFields/StringParamInput/StringParameterInput";
import { TUTORIAL_KEYS } from "../../../shared/tutorialData";

const TokenParameters = ()=>{
    const {
        tokensPerCluster,
        silenceBetweenTokens,
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenNumParameterReducer)  
            
    const {
        ['Name']:   NameVal,
        ['Tokens']: TokensVal
    } = useSelector((state:RootState)=>state.persistedRootReducer.tokenSetParameterReducer);




    
    return (
            <div >
                <StringParameterInput link={TUTORIAL_KEYS.SpeakTheseTokens} isMultiline={false}  name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
                <NumParameterInput delta={crementTPC} modify={modifyTPC} link={TUTORIAL_KEYS.TokensPerCluster} name={'Tokens Per Cluster'} val={tokensPerCluster}/>
                <NumParameterInput delta={crementSBT} modify={modifySBT} link={TUTORIAL_KEYS.SilenceBetweenTokens} name={'Silence Between Tokens'} val={silenceBetweenTokens}/>
            </div>
    )
}

export default TokenParameters