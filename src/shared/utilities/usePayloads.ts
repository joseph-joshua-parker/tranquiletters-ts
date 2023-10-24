import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound},
        tokenSetParameterReducer : {['Tokens']: tokens}
    } = useSelector((state: RootState)=>state)
    

    return {tokens, questionSound};

}

export default usePayloads;