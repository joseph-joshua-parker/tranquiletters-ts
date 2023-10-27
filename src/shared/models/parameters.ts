
export type TOKEN_NUM_PARAMS = 'Tokens/Cluster' |'Silence/Tokens'|'Silence/Clusters'  | 'SessionTime';


export interface NumParameterState {
    'Tokens/Cluster': number,
    'Silence/Tokens': number,
    'Silence/Clusters': number
    'SessionTime': number
}

export type STRING_PARAMS ='Tokens'|'Name';


export interface TokenSetParameterState {
    'Tokens': string[],
    'Name': string
}

export const defaultStringParams = {
    'Tokens': ['a', 'b', 'c','d', 'e'],
    'Name': ''
}


