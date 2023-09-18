import { configureStore } from "@reduxjs/toolkit";
import  forecastReducer from "./features/forescastSlice"

export const store = configureStore({
    reducer: {
        forecast: forecastReducer,
    },
})

// store.subscribe(() => {
//     console.log('Estado cambio')
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch