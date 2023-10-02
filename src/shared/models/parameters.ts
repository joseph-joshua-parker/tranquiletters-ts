
export type NUM_PARAMS = 'Tokens/Cluster' |'Silence/Tokens'|'Silence/Clusters';


export interface NumParameterState {
    'Tokens/Cluster': number,
    'Silence/Tokens': number,
    'Silence/Clusters': number
}

export type STRING_PARAMS ='Tokens'|'Name';


export interface StringParameterState {
    'Tokens': string[],
    'Name': string
}

export const defaultStringParams = {
    'Tokens': [],
    'Name': ''
}


