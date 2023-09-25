import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import config from "../../../config";
import { position } from "../../functions/geoLocal";

 export  interface nameState {
    loading: boolean,
    city: string,
    stateT: string, 
    country: string,
    error: null | string
   }

  export const initialState : nameState = {
      loading: false,
      city: "",
      stateT: "", 
      country: "",
      error: null
  }

export const getNamePlace = createAsyncThunk ( 
    'weather/getNamePlace', 
    async (latLon: position, {rejectWithValue}) => {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latLon.lat}&lon=${latLon.lon}&appid=${config.API_KEY}`)
      if(!response.ok) {
        const message = `An error has ocurred: ${response.status}`;
        return rejectWithValue(message)
      } else {
        const dataPlace = await response.json();
       return {city: dataPlace[0].name, stateT: dataPlace[0].state, country: dataPlace[0].country}
      }
    }
  )

export const namePlaceSlice = createSlice({
    name: "namePlace", 
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
    builder.addCase(getNamePlace.pending, (state) => {
        state.loading = true
      })

      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(getNamePlace.fulfilled, (state, action: PayloadAction<any>) => {
        const { city, stateT, country }  = action.payload;
        state.loading = false;
         console.log(action.payload)
          state.city = city
          state.stateT = stateT
          state.country = country
         
      })
      builder.addCase(getNamePlace.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload;
      })
    }
})

export default namePlaceSlice.reducer; // exportamos el reducer