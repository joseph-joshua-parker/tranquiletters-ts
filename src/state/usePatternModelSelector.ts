import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, End} from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store"


const usePatternModelSelector = ()=>{
     const state = useSelector((state:RootState)=>{
        const {tokenSetParameterReducer:Set, tokenNumParameterReducer: TokenParams} = state;
         const {
            ['Tokens/Cluster']: TPC, 
            ['Silence/Tokens']: SBT,
            ['Silence/Clusters']: SBC,
            ['Position']: Translation,
        } = TokenParams

        const {
            ['Tokens']:Tokens, 
            ['Name']: Name
        } = Set;

        const selectToken = ()=>{
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }

        const initialModel = [
            ...(new Array<PatternUnit>(TPC*SBT+SBC).fill(Silence)), 
        ];

                                                //is within the cluster && is spaced out by Silence 
        const preTranslationModel = initialModel.map((unit, index)=>    index < TPC*SBT && 
                                                                        index % SBT == 0
            ? new PatternUnit(STIM_TYPES.Verbal, selectToken())
            : unit
        );

        //move everything to the right
        const leftSideTranslationFactor = new Array<PatternUnit>(Translation).fill(Silence);
        preTranslationModel.unshift(...leftSideTranslationFactor);

        //trim the right side fat, a poor man's splice
        preTranslationModel.length = initialModel.length;

        preTranslationModel.push(End);
        
        return preTranslationModel;


            


    
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
        

        





