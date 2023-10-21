
export type NUM_PARAMS = 'Tokens/Cluster' |'Silence/Tokens'|'Silence/Clusters' | 'Position';


export interface NumParameterState {
    'Tokens/Cluster': number,
    'Silence/Tokens': number,
    'Silence/Clusters': number
    'Position': number
}

export type STRING_PARAMS ='Tokens'|'Name';


export interface TokenSetParameterState {
    'Tokens': string[],
    'Name': string
}

export const defaultStringParams = {
    'Tokens': [],
    'Name': ''
}


