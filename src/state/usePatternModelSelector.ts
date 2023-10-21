import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, } from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store"


const usePatternModelSelector = ()=>{
     const state = useSelector((state:RootState)=>{
        const {stringParameterReducer:Strings, numParameterReducer: Nums} = state;
         const {
            ['Tokens/Cluster']: TPC, 
            ['Silence/Tokens']: SBT,
            ['Silence/Clusters']: SBC,
            ['Position']: Position,
        } = Nums

        const {
            ['Tokens']:Tokens, 
            ['Name']: Name
        } = Strings;

        const selectToken = ()=>{
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }

        const initialModel = [
            ...(new Array<PatternUnit>(TPC*SBT+SBC).fill(Silence)), 
                new PatternUnit(STIM_TYPES.End, '')
        ];

        const leftSideTranslationFactor = new Array<PatternUnit>(Position).fill(Silence);
                                                //is within the cluster && is spaced out by Silence && aligned with position 
        const preTranslationModel = initialModel.map((unit, index)=> index < TPC*SBT && 
                index % SBT == 0
            ? new PatternUnit(STIM_TYPES.Verbal, selectToken())
            : unit
        );

        preTranslationModel.unshift(...leftSideTranslationFactor);
        preTranslationModel.length = initialModel.length;
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
        

        





