import { NUM_PARAMS } from "./parameters"


export interface NumActionPayload{
    name: NUM_PARAMS,
    val: number
}

export interface StringActionPayload{
    name: NUM_PARAMS,
    val: string
}

export interface ArrayActionPayload{
    name: NUM_PARAMS,
    val: string[]
}