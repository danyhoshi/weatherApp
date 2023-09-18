import { configureStore } from "@reduxjs/toolkit";
import  geoLocationReducer from "./features/geoLocationSlice";

export const store = configureStore({
    reducer: {
        geoLocation: geoLocationReducer,
    },
})

// store.subscribe(() => {
//     console.log('Estado cambio')
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch