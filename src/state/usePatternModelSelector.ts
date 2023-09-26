import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, } from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store"
import { NUM_PARAMS, STRING_PARAMS } from "../shared/models/parameters";


const usePatternModelSelector = ()=>{
     const state = useSelector((state:RootState)=>{
        const {stringParameterReducer:Strings, numParameterReducer: Nums} = state;
         const {
            [NUM_PARAMS.SecondsBetweenClusters]: SBC, 
            [NUM_PARAMS.SecondsBetweenTokens]: SBT,
            [NUM_PARAMS.TokensPerCluster]: TPC,
        } = Nums

        const {[STRING_PARAMS.Tokens]: Tokens} = Strings;
        console.log(Tokens);
        const selectToken = ()=>{
            
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }

        const initialModel = [
            ...(new Array<PatternUnit>(TPC*SBT+SBC).fill(Silence)), 
                new PatternUnit(STIM_TYPES.End, '')
        ];

        return initialModel.map((unit, index)=> index < TPC*SBT && index % SBT == 0
            ? new PatternUnit(STIM_TYPES.Verbal, selectToken())
            : unit
        );

            


    
            /*
            switch(unit.type){
                case STIM_TYPES.Feedback: {
                    break;
                }
                case STIM_TYPES.Silence:{
                    return unit;
                    break;

                }
                case STIM_TYPES.SoundFX:{
                    break;
                }
                case STIM_TYPES.Verbal:{
                    
                    break;
                }
            }*/
    })

    return state;
}

export default usePatternModelSelector;
        

        





