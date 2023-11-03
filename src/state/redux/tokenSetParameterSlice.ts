import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TokenSet {
    setName: string,
    tokens: string[]
}

interface TokenSetState {
    currentlySelectedSet: string,
    tokenSets: TokenSet[]
}

export interface TokensPayload {setName:string, tokens: string[]}

const defaultTokens = {
    currentlySelectedSet: 'First Five',
    tokenSets: [
        {
            setName: 'First Five', 
            tokens:['a', 'b', 'c', 'd', 'e']
        },

        {
            setName: 'Sleepy',
            tokens: ['x', 'z', 'y', 'w', 'v']
        }
    ]
};

const tokenSetParameterSlice = createSlice({
    name: 'setParameters',
    initialState: defaultTokens,
    reducers: {
        selectSet(state, action: PayloadAction<string>){
            const tokenSet = state.tokenSets.find(set=> set.setName == state.currentlySelectedSet);
            if(!tokenSet) {console.log('token set not found for selecting set'); return;}
            state.currentlySelectedSet = action.payload;
        },

        setTokens(state, action: PayloadAction<TokensPayload>){
            const tokenSet = state.tokenSets.find(set=> set.setName == state.currentlySelectedSet);
            if(!tokenSet) {console.log('token set not found for setting tokens'); return;}
            else tokenSet.tokens = action.payload.tokens;
        },

        addNewSet(state, action: PayloadAction<TokensPayload>){
            const {setName, tokens} = action.payload;
            state.tokenSets.push({
                setName, tokens
            })

            state.currentlySelectedSet = setName;
        },

        removeSet(state, action: PayloadAction<string>){
            const setName = action.payload;
            state.tokenSets = state.tokenSets.filter(set=>set.setName != setName);
            if(state.currentlySelectedSet == setName)   state.currentlySelectedSet = '';
        }
    }
})

export const {selectSet, setTokens, addNewSet, removeSet} = tokenSetParameterSlice.actions;
export default tokenSetParameterSlice.reducer;