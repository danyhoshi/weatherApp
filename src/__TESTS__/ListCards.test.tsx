import { render, fireEvent, screen, waitFor } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import React from 'react'
import ListCards from '../components/ListCards'
import type { PreloadedState } from '@reduxjs/toolkit'
import weathercode from '../functions/weathercode'
import '@testing-library/jest-dom';
import {prettyDOM} from '@testing-library/dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState, setupStore } from '../redux/store'
import { position } from '../functions/geoLocal.tsx';
import { getForecast, getGeoposition } from '../redux/features/forescastSlice.tsx';
import App from '../App.tsx'
import { act } from 'react-dom/test-utils';
import namePlaceReducer, { getNamePlace, nameState  } from '../redux/features/namePlaceSlice'
import forecastReducer, { positionState } from '../redux/features/forescastSlice.tsx'
import fetch from 'jest-fetch-mock';
import config from "../../config.ts";
import { today } from '../functions/hour.tsx'
describe("ListCards", () => {

//   beforeEach(async() => {
//        const store = setupStore()
//        const latLon: position = { lat: 10.2627926, lon: -67.5788691 }
       
//             store.dispatch(getNamePlace(latLon))
//             store.dispatch( getForecast(latLon))
//             //store.dispatch(todoAdded('Buy milk'))
          
//        })
    const stateName: nameState = {
     loading: false,
     city: "",
     stateT: "", 
     country: "",
     error: null
   }

   const statePosition : positionState = {
     loading: false,
     lat: 10.2627946, 
     lon:-67.5788673,
     dataF: {
       time: [],
       weathercode: [],
       maxTemp: [],
       minTemp: [],
       description: []
     },
     error: null
 }

 beforeEach(() => {
  fetch.resetMocks();
 })
  test("Get the same", () => {
     const initialState: nameState = stateName 
     const action = { type: 'unknown' }
     const expectedState = initialState
     expect(namePlaceReducer(initialState, action)).toEqual(expectedState)
  })

  test("Get NamePlace", () => {
     const initialState: nameState = stateName 
     const action = {type:'weather/getNamePlace/fulfilled',payload:{city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE'},meta:{arg:{lat:10.2627946,lon:-67.5788673},requestId:'1AiloLeyHXmbsDCGxR5Kg',requestStatus:'fulfilled'}};
     const expectedState: nameState = { ...stateName,  city:"Parroquia Las Delicias", stateT:"Aragua State", country:"VE"}
     expect(namePlaceReducer(initialState, action)).toEqual(expectedState)
  })

  test("Set Loading NamePlace true", () => {
     const initialState: nameState = stateName 
     const action =  {type:'weather/getNamePlace/pending',meta:{arg:{lat:0,lon:0},requestId:'OcD3kV9ai-7iWFA8j3o6J',requestStatus:'pending'}};
     const expectedState: nameState = { ...stateName,  loading:true, city:'',stateT:'',country:'',error:null}
     expect(namePlaceReducer(initialState, action)).toEqual(expectedState)
  })

  test("Set Loading forecast true", () => {
     const initialState: positionState = statePosition 
     const action =  {type:'weather/getForecast/pending',meta:{arg:{lat:0,lon:0},requestId:'TzdJ7DadEQ9i2OxXSVjBE',requestStatus:'pending'}};
     const expectedState: positionState = { ...statePosition,  loading:true, dataF:{time:[],weathercode:[],maxTemp:[],minTemp:[],description:[]},error:null}
     expect(forecastReducer(initialState, action)).toEqual(expectedState)
  })

  test("Get Forecast", () => {
     const initialState: positionState = statePosition 
     const action = {type:'weather/getForecast/fulfilled',payload:{time:['2023-09-24','2023-09-25','2023-09-26','2023-09-27','2023-09-28','2023-09-29','2023-09-30'],weathercode:[3,3,80,3,3,3,2],maxTemp:[26.2,26.3,26.2,26.6,26.3,26.6,26.4],minTemp:[25.5,25.4,25.6,25.9,25.9,25.9,25.7]},meta:{arg:{lat:0,lon:0},requestId:'CD8a8PMG6DdjrleprxYDV',requestStatus:'fulfilled'}}
     const expectedState: positionState = { ...statePosition,  loading:false,lat:10.2627946,lon:-67.5788673,dataF:{time:['2023-09-24','2023-09-25','2023-09-26','2023-09-27','2023-09-28','2023-09-29','2023-09-30'],weathercode:[3,3,80,3,3,3,2],maxTemp:[26.2,26.3,26.2,26.6,26.3,26.6,26.4],minTemp:[25.5,25.4,25.6,25.9,25.9,25.9,25.7],description:['Overcast','Overcast','Rain Showers Slight','Overcast','Overcast','Overcast','Partly cloudy']},error:null}
     expect(forecastReducer(initialState, action)).toEqual(expectedState)
  })

  test("Render Forecast date", () => {
     const initialStatePosition: positionState = {loading:false,lat:10.2627946,lon:-67.5788673,dataF:{time:['2023-09-24','2023-09-25','2023-09-26','2023-09-27','2023-09-28','2023-09-29','2023-09-30'],weathercode:[3,3,3,95,3,3,3],maxTemp:[31.9,35.1,35.6,33,35,35.6,35.1],minTemp:[25.9,24,25.2,25.8,25.1,26.5,26.3],description:['Overcast','Overcast','Overcast','Thunderstorm','Overcast','Overcast','Overcast']},error:null}
     const initialStateNamePlace: nameState = { loading:false,city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE', error: null }

     const { getByText } = renderWithProviders(<ListCards />, {
          preloadedState: {
            forecast: initialStatePosition,
            namePlace: initialStateNamePlace
          }
        })
    expect(getByText(/26-09-2023/i)).toBeInTheDocument();
  })

  test("Render Loading", () => {
     const initialStatePosition: positionState = {loading:false,lat:10.2627946,lon:-67.5788673,dataF:{time:['2023-09-24','2023-09-25','2023-09-26','2023-09-27','2023-09-28','2023-09-29','2023-09-30'],weathercode:[3,3,3,95,3,3,3],maxTemp:[31.9,35.1,35.6,33,35,35.6,35.1],minTemp:[25.9,24,25.2,25.8,25.1,26.5,26.3],description:['Overcast','Overcast','Overcast','Thunderstorm','Overcast','Overcast','Overcast']},error:null}
     const initialStateNamePlace: nameState = { loading:true,city:'',stateT:'',country:'', error: null }

     const { getByText } = renderWithProviders(<ListCards />, {
          preloadedState: {
            forecast: initialStatePosition,
            namePlace: initialStateNamePlace
          }
        })
    expect(getByText(/Loading/i)).toBeInTheDocument();
  })

  test("Call the Thunk Name Place", async () => {
    const fetchMock = fetch.mockResponse("{city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE'}", { status: 200 });
    const latLon: position = { lat: 10.2627767, lon: -67.5788659 }
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({
        forecast: {
          loading: false,
          lat: 10.2627946, 
          lon:-67.5788673,
          dataF: {
            time: [],
            weathercode: [],
            maxTemp: [],
            minTemp: [],
            description: []
          },
          error: null
        },
        namePlace: {
          loading: false,
          city: "",
          stateT: "", 
          country: "",
          error: null
        }
    });
      
    const action = getNamePlace(latLon);
    await action(dispatch, getState, undefined);

     // expect(fetchMock).toHaveBeenCalled()
     expect(fetchMock).toHaveBeenCalledWith(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latLon.lat}&lon=${latLon.lon}&appid=${config.API_KEY}`)
    });

    test("Call the Thunk Forecast", async () => {
      const fetchMock = fetch.mockResponse("{time:['2023-09-25','2023-09-26','2023-09-27','2023-09-28','2023-09-29','2023-09-30','2023-10-01'],weathercode:[3,80,3,3,3,3,3],maxTemp:[34.3,34.5,35.3,34.7,35.8,35.6,35.7],minTemp:[24.4,25.2,25.2,25.4,26,26.7,26.3]}", { status: 200 }); //Este sería una respuesta de la API cuando es completada, pero no la uso paa comparar, solo para emular que se recibió respuesta
  
     const latLon: position = { lat: 10.2627767, lon: -67.5788659 }
   
        const dispatch = jest.fn();
        const getState = jest.fn().mockReturnValue({
          forecast: {
            loading: false,
            lat: 10.2627946, 
            lon:-67.5788673,
            dataF: {
              time: [],
              weathercode: [],
              maxTemp: [],
              minTemp: [],
              description: []
            },
            error: null
          },
          namePlace: {
            loading: false,
            city: "",
            stateT: "", 
            country: "",
            error: null
          }
        });
        const action = getForecast(latLon);
        await action(dispatch, getState, undefined); //Esto realmente llama a la funcion, jest se va a ejecutar las lineas, solo que no toma en cuenta la respuesta en sí sino, en este caso cuando fue ok
       expect(fetchMock).toHaveBeenCalledWith(`https://api.open-meteo.com/v1/forecast?latitude=${latLon.lat}&longitude=${latLon.lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`) //si yo coloco otra cosa que no haya llamado en el codigo, esto falla, por ejemplo si cmbio l latitud con l que llme al thunk y qe es prametro de esta peticion
      });
//TESTS CON CONSULTA API REAL
      // test('Change state after get Name place', async () => {
      //   //TODO: HACER QUE LOADING DE FORECAST SEA FALSE PARA QUE NO MUESTRE LOADING EL RENDER
      //   const store  = setupStore()
      //   const latLon: position = { lat: 10.2627767, lon: -67.5788659 }
      //   store.dispatch(getForecast(latLon))
      //   store.dispatch(getNamePlace(latLon))
      //   await waitFor(() => {
      //     console.log("NamePlace: ", store.getState().namePlace)
      //     console.log("Forecast: ", store.getState().forecast)
      //     // renderWithProviders(<ListCards />, {
      //     //   preloadedState: {
      //     //     forecast: store.getState().forecast,
      //     //     namePlace: store.getState().namePlace
      //     //   }})
      //     expect(store.getState().namePlace.country).toBe('VE');
      //    // expect(screen.getByText('27-09-2023')).toBeInTheDocument();
      //   }, {timeout: 6000});    
      // })


      // test('Set Forecast state', async () => {
      //   const store = setupStore()
      //   const latLon: position = { lat: 10.2627767, lon: -67.5788659 }
      //   store.dispatch(getForecast(latLon))
      //   await waitFor(() => {
      //    expect(store.getState().forecast.dataF.time[0]).toEqual(today())
      //    // const { getByText } = renderWithProviders(<ListCards />, { store })
      //    // expect(getByText('VE')).toBeInTheDocument();
      //   }, {timeout: 4000});
      // })
 })

 


//   test('reducers', () => {
//      let state;
//      state = reducers({forecast:{loading:false,lat:10.2627946,lon:-67.5788673,dataF:{time:[],weathercode:[],maxTemp:[],minTemp:[],description:[]},error:null},namePlace:{loading:false,city:'',stateT:'',country:''}}, {type:'weather/getNamePlace/fulfilled',payload:{city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE'},meta:{arg:{lat:10.2627946,lon:-67.5788673},requestId:'1AiloLeyHXmbsDCGxR5Kg',requestStatus:'fulfilled'}});
//      expect(state).toEqual({forecast:{loading:false,lat:10.2627946,lon:-67.5788673,dataF:{time:[],weathercode:[],maxTemp:[],minTemp:[],description:[]},error:null},namePlace:{loading:false,city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE'}});
//    });
//   test("Render the date given to initialState 22-09-2023", async () => { 
//     const store = setupStore()
//        const latLon: position = { lat: 10.2627926, lon: -67.5788691 }
//        store.dispatch(getNamePlace(latLon))
//        store.dispatch( getForecast(latLon))

//     const getByText = await waitFor(() => {     
//         console.log("Muestramelo: ", store.getState().namePlace.country, "Aquiiiiiii")
//         const { getByText } = renderWithProviders(<ListCards />, { store });
//        // console.log("AQUIIIIIIIIII" + getByText)
//         return getByText;
//    }, { timeout: 3000 })   
    
    //await waitFor(() => { 
//      await waitFor(() => {  
//         const date = getByText(/22-09-2023/i);
//         expect(date).toBeInTheDocument();
//    }, { timeout: 3000 });
//      expect(getByText(/loading/i)).toBeInTheDocument();
//      // expect(await findByText(/Loading/i, undefined, { timeout: 4000 })).toBeInTheDocument();
//   })

//   test('Sets up initial state state with actions', async () => {
//     const store = setupStore()
//     const latLon: position = { lat: 10.2627926, lon: -67.5788691 }
//     store.dispatch(getNamePlace(latLon))
//     store.dispatch( getForecast(latLon))
  
//     const { getByText } = await waitForElement(() => renderWithProviders(<ListCards />, { store }))
    
//   })

//   test("Render the description given to initialState Overcast", () => {      
//     const description = screen.getByRole("heading", {name: /Overcast/i});
//     console.log(prettyDOM(description));
//     expect(description).toBeInTheDocument();
//   })
