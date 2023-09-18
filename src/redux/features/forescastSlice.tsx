import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPosition } from "../../functions/geoLocal";
import config from "../../../config";
import { showTime } from "../../functions/hour";

 export  interface positionState {
    loading: boolean,
    lat: number,
    lon: number
    city: string,
    stateT: string, 
    country: string,
    dataF: {
      time: Array<string>,
      weathercode: Array<number>,
      temperature_2m_max: Array<number>,
      temperature_2m_min: Array<number>
    }
    
    error: null | string
   }

  const initialState : positionState = {
      loading: false,
      lat: 0, 
      lon: 0,
      city: "",
      stateT: "", 
      country: "",
      dataF: {
        time: [],
        weathercode: [],
        temperature_2m_max: [],
        temperature_2m_min: []
      },
      error: null
  }
const getForecast = createAsyncThunk (
    'weather/getForecast',
    async (thunkApi) => {
      const position = await getPosition()
      .then((latLon) => {
         const place = fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latLon.lat}&lon=${latLon.lon}&appid=${config.API_KEY}`)
        .then((response) => (response.ok ? response.json() : Promise.reject(response)))
        .then((dataPlace) => {
            const place = { lat: latLon.lat, lon: latLon.lon, city: dataPlace[0].name, stateT: dataPlace[0].state, country: dataPlace[0].country};
            return place;
        })
        .catch((err) => {
            const message = err.statusText || 'Ocurrio un error fetch openweather';
            alert(`Error ${err.status}: ${message}`);
        });
        return place
       // return place;
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error getPosition';
        return thunkApi.rejectWithValue(message)
      });
    
     const placeF = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
          console.log(`Temperatura hoy: ${data.hourly.temperature_2m[showTime()]}`);
          return { lat: position.lat, lon: position.lon, city: position.city, stateT: position.stateT, country: position.country, dataF: data.daily};
      })
      .catch((err) => {
          const message = err.statusText || 'Ocurrio un error';
          alert(`Error ${err.status}: ${message}`);
        });
        return placeF;
    }
  )


export const forecastSlice = createSlice({
    name: "forecast", 
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getForecast.pending, (state) => {
          console.log("loading")
          state.loading = true
        })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getForecast.fulfilled, (state, action: PayloadAction<any>) => {
          const { lat, lon, city, stateT, country, dataF }  = action.payload;
          state.loading = false;
           console.log(action.payload)
            state.lat = lat
            state.lon = lon
            state.city = city
            state.stateT = stateT
            state.country = country
            state.dataF = dataF;
        })
        builder.addCase(getForecast.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false
          state.error = action.payload;
        })
      },
})

export { getForecast } 
//export { fetchPokeById } = pokeSlice.actions
export default forecastSlice.reducer; // exportamos el reducer