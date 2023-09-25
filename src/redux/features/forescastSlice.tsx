import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPosition } from "../../functions/geoLocal";
import weathercodeDescription from "../../functions/weathercodeDescription"
import { position } from "../../functions/geoLocal";

 export  interface positionState {
    loading: boolean,
    lat: number,
    lon: number
    dataF: {
      time: Array<string>,
      weathercode: Array<number>,
      maxTemp: Array<number>,
      minTemp: Array<number>,
      description: Array<string>
    }
    
    error: null | string
   }

  const initialState : positionState = {
      loading: false,
      lat: 0, 
      lon: 0,
      dataF: {
        time: [],
        weathercode: [],
        maxTemp: [],
        minTemp: [],
        description: []
      },
      error: null
  }
export const getGeoposition = createAsyncThunk ( 
  'weather/getGeoposition', 
  async (arg, {rejectWithValue}) => {
    const position = await getPosition()
    if(!position) {
      const message = `An error has ocurred: ${position}`;
      return rejectWithValue(message)
    } else {
      return position;
    }
  }
)

export const getForecast = createAsyncThunk ( 
  'weather/getForecast', 
  async (latLon: position, {rejectWithValue}) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
    if(!response.ok) {
      const message = `An error has ocurred: ${response.status}`;
      return rejectWithValue(message)
    } else {
      const data = await response.json();
      console.log("PASANDO POR GETfORECAST ", data.daily.time,)
      return {time: data.daily.time,  weathercode: data.daily.weathercode, maxTemp: data.daily.temperature_2m_max, minTemp: data.daily.temperature_2m_min}
    }
  }
)

export const forecastSlice = createSlice({
    name: "forecast", 
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        //para getGeoposition
        builder.addCase(getGeoposition.pending, (state) => {
         // console.log("loading")
          state.loading = true
        })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getGeoposition.fulfilled, (state, action: PayloadAction<any>) => {
          const { lat, lon }  = action.payload;
          state.loading = false;
          // console.log(action.payload)
            state.lat = lat
            state.lon = lon
        })
        builder.addCase(getGeoposition.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false
          state.error = action.payload;
        })

      //PARA PEDIR EL FORECAST
      builder.addCase(getForecast.pending, (state) => {
       // console.log("loading")
        state.loading = true
      })
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(getForecast.fulfilled, (state, action: PayloadAction<any>) => {
        const { time, weathercode, maxTemp, minTemp }  = action.payload;
        state.loading = false;
         console.log(action.payload)
          state.dataF.time = time;
          state.dataF.weathercode = weathercode;
          state.dataF.maxTemp = maxTemp;
          state.dataF.minTemp = minTemp;
          weathercode.forEach((e: number, index: number) => {
            state.dataF.description[index] = weathercodeDescription.get(e);
          });

      })

      builder.addCase(getForecast.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload;
      })
      }
})

export default forecastSlice.reducer; // exportamos el reducer