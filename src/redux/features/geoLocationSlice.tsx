import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPosition, position, positionComplete } from "../../functions/geoLocal";
import config from "../../../config";
import { showTime } from "../../functions/hour";

   interface positionState {
    loading: boolean,
    lat: number,
    lon: number
    city: string,
    stateT: string, 
    country: string,
    error: null | string
   }

  const initialState : positionState = {
      loading: false,
      lat: 0, 
      lon: 0,
      city: "",
      stateT: "", 
      country: "",
      error: null
  }
const getGeoLocation = createAsyncThunk (
    'weather/getLocation',
    async (thunkApi) => {
      const position = await getPosition()
      .then((latLon) => {
         const place = fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latLon.lat}&lon=${latLon.lon}&appid=${config.API_KEY}`)
        .then((response) => (response.ok ? response.json() : Promise.reject(response)))
        .then((dataPlace) => {
            const place = { lat: latLon.lat, lon: latLon.lon, city: dataPlace[0].name, stateT: dataPlace[0].state, country: dataPlace[0].country};

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((data) => {
                console.log(`Temperatura hoy: ${data.hourly.temperature_2m[showTime()]}`);
            })
            .catch((err) => {
                const message = err.statusText || 'Ocurrio un error';
                alert(`Error ${err.status}: ${message}`);
              });
            return place;

        })
        .catch((err) => {
            const message = err.statusText || 'Ocurrio un error';
            alert(`Error ${err.status}: ${message}`);
        });

        return place
       // return place;
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        return thunkApi.rejectWithValue(message)
      });
      return position

    }
  )
const getForest = createAsyncThunk (
    'poke/fetchById',
    async (pokeId: string, thunkApi) => {
      const name = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.state.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => {
        return data.forms[0].name
       // return place;
      })
      .catch((err) => {
        const message = err.statusText || 'Ocurrio un error';
        return thunkApi.rejectWithValue(message)
      });
      return name
    
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`) 
        // const data = await response.json();
        // return data.forms[0].name
 
      
      // catch(error: any)
      // {
      //   return thunkApi.rejectWithValue(error.vale)
      // }
      
    }
  )


export const geoLocationSlice = createSlice({
    name: "geoLocation", 
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getGeoLocation.pending, (state, action) => {
          console.log("loading")
          state.loading = true
        })
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getGeoLocation.fulfilled, (state, action: PayloadAction<positionComplete>) => {
          const { lat, lon, city, stateT, country }   = action.payload;
          state.loading = false;
           console.log(action.payload)
            state.lat = lat
            state.lon = lon
            state.city = city
            state.stateT = stateT
            state.country = country
        })
        builder.addCase(getGeoLocation.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false
          state.error = action.payload;
        })
      },
})

export { getGeoLocation } 
//export { fetchPokeById } = pokeSlice.actions
export default geoLocationSlice.reducer; // exportamos el reducer