import NumParameterInput from "../NumParameterInput/NumParameterInput";
import { NUM_PARAMS, STRING_PARAMS } from "../../shared/models/parameters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import './ParameterPanelStyles.css'
import { setName, setTokens } from "../../state/stringParameterSlice";
import StringParameterInput from "../StringParamInput/StringParameterInput";


const VerbalParameterPanel = ()=>{
    const  {
        [NUM_PARAMS.TokensPerCluster]:        TokensPerCluster,
        [NUM_PARAMS.SecondsBetweenTokens]:    SecondsBetweenTokens,
        [NUM_PARAMS.SecondsBetweenClusters]:  SecondsBetweenClusters
    } = useSelector((state:RootState)=>state.numParameterReducer)

    const {
        [STRING_PARAMS.Name]: Name,
        [STRING_PARAMS.Tokens]: Tokens 
    } = useSelector((state:RootState)=>state.stringParameterReducer);

    
    return (
        <div className="panel">

                <div className="panel-block param center-content vertical">
                    <fieldset>
                         <legend  className="label is-small">Verbal Stims</legend>
                        <StringParameterInput action={setName} name={STRING_PARAMS.Name} val={Name}/>
                        <StringParameterInput action={setTokens} name={STRING_PARAMS.Tokens} val={Tokens.join(' ')}/>
                        <NumParameterInput name={NUM_PARAMS.TokensPerCluster} val={TokensPerCluster}/>
                        <NumParameterInput name={NUM_PARAMS.SecondsBetweenTokens} val={SecondsBetweenTokens}/>
                        <NumParameterInput name={NUM_PARAMS.SecondsBetweenClusters} val={SecondsBetweenClusters}/>
                    </fieldset>
                </div>
        </div>
    )
}

export default VerbalParameterPanel;