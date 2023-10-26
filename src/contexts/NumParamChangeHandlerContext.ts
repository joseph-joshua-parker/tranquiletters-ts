import { createContext } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { NumActionPayload } from "../shared/models/actionsPayload";


const NumParamChangeHandlerContext = createContext<{
        delta: ActionCreatorWithPayload<NumActionPayload>,
        modify: ActionCreatorWithPayload<NumActionPayload>
    } | undefined>(undefined);


export default NumParamChangeHandlerContext;