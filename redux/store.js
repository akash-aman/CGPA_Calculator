import { configureStore } from "@reduxjs/toolkit";
import cgpaReducer from "../state/cgpaSlice"

export const store = configureStore({
    reducer:{
        cgpa : cgpaReducer
    }
})