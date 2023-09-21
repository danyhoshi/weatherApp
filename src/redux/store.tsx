import { configureStore } from "@reduxjs/toolkit";
import  forecastReducer from "./features/forescastSlice"
import  namePlaceReducer from "./features/namePlaceSlice"

export const store = configureStore({
    reducer: {
        forecast: forecastReducer,
        namePlace: namePlaceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch