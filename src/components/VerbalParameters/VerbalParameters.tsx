import NumParameterInput from "../NumParameterInput/NumParameterInput";
import { NUM_PARAMS, STRING_PARAMS } from "../../shared/models/parameters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { NumParameterState } from "../../shared/models/parameters";


import { setName, setTokens } from "../../state/stringParameterSlice";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import { ReactNode } from "react";

const VerbalParameters = ()=>{
/*        'Tokens/Cluster':       TokensPerCluster,
        'Silence/Tokens':       SecondsBetweenTokens,
        'Silence/Clusters':     SecondsBetweenClusters*/ 

    const numParamState = useSelector((state:RootState)=>state.numParameterReducer)
    const stringParamState  = useSelector((state:RootState)=>state.stringParameterReducer);
    type Input = typeof NumParameterInput & typeof StringParameterInput;

    const MakeInputsFrom = (Component: Input, state: Object)=>{
        return Object.entries(state)
                    .map(( [name, val])=> <Component name={name} val={val} />)    
            }
    }
    return (
        <>
            {MakeInputsFrom(numParamState)}
        </>
    )
}

export default VerbalParameters