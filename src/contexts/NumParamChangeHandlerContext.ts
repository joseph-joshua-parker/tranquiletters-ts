import { createContext } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { NumActionPayload } from "../shared/models/actionsPayload";



export interface ParamChangeHandlers {
    delta: ActionCreatorWithPayload<NumActionPayload>,
    modify: ActionCreatorWithPayload<NumActionPayload>
}

const NumParamChangeHandlerContext = createContext<ParamChangeHandlers>({} as ParamChangeHandlers);


export default NumParamChangeHandlerContext;