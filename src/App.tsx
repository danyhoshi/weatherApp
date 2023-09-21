import './App.css'
import ListCards from './components/ListCards.tsx';
import React from "react"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/store'
import { position } from './functions/geoLocal.tsx';
import { getForecast, getGeoposition } from './redux/features/forescastSlice.tsx';
import { getNamePlace } from './redux/features/namePlaceSlice.tsx';
  //import { ThunkDispatch } from "@reduxjs/toolkit"; //se importa para que no de problema el tipado del dispatch de thunks
function App() {

    const  forecast  = useSelector((state: RootState) => state.forecast)
    const  place  = useSelector((state: RootState) => state.namePlace)
  //  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
   const dispatch = useDispatch<AppDispatch>();
  
  React.useEffect(() => {
    dispatch(getGeoposition())
  }, [])

  React.useEffect(() => {
    const latLon: position = { lat: forecast.lat, lon: forecast.lon }
    dispatch(getNamePlace(latLon))
    dispatch(getForecast(latLon))
  }, [forecast.lat])

   return (
    <>
        <h1 className='title'>Weather App</h1>

        <div className='containerG'>
        {/* {(place.loading) ? <p>Loading ...</p> :  */}
          <ListCards /> 
          {/* } */}
        
        </div>
    </>
    )
}

export default App
