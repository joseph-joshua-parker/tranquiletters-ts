
export enum NUM_PARAMS {
    TokensPerCluster ='Tokens/Cluster',
    SecondsBetweenTokens='Silence/Token',
    SecondsBetweenClusters='Silence/Cluster'
}

export interface NumParameterState {
    [NUM_PARAMS.TokensPerCluster]: number,
    [NUM_PARAMS.SecondsBetweenTokens]: number,
    [NUM_PARAMS.SecondsBetweenClusters]: number
}

export enum STRING_PARAMS {
    Tokens = 'Tokens',
    Name = 'Name'
}

export interface StringParameterState {
    [STRING_PARAMS.Tokens]: string[],
    [STRING_PARAMS.Name]: string
}

export const defaultStringParams = {
    [STRING_PARAMS.Tokens]: [],
    [STRING_PARAMS.Name]: ''
}


