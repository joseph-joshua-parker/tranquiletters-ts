import { TOKEN_NUM_PARAMS } from "./parameters"


export interface NumActionPayload{
    name: TOKEN_NUM_PARAMS,
    val: number
}

export interface StringActionPayload{
    name: TOKEN_NUM_PARAMS,
    val: string
}

export interface ArrayActionPayload{
    name: TOKEN_NUM_PARAMS,
    val: string[]
}