import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import  forecastReducer from "./features/forescastSlice"
import  namePlaceReducer from "./features/namePlaceSlice"

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    forecast: forecastReducer,
    namePlace: namePlaceReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
// import { configureStore } from "@reduxjs/toolkit";
// import  forecastReducer from "./features/forescastSlice"
// import  namePlaceReducer from "./features/namePlaceSlice"

// export const store = configureStore({
//     reducer: {
//         forecast: forecastReducer,
//         namePlace: namePlaceReducer,
//     },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch