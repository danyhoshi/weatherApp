import './App.css'
import DayCard from './components/DayCard'
import { useEffect } from "react"
import { geoPosition, getPosition, position } from './functions/geoLocal';
import config from '../config.ts'; 
import { useDispatch, useSelector } from 'react-redux'
import { getGeoLocation } from './redux/features/geoLocationSlice'
import { AppDispatch, RootState } from './redux/store'
  //import { ThunkDispatch } from "@reduxjs/toolkit"; //se importa para que no de problema el tipado del dispatch de thunks
function App() {
  
  
 
  
    const  geoLocation  = useSelector((state: RootState) => state.geoLocation)
   // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
   const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getGeoLocation())
  }, [])
   
   return (
    <>
        <h1 className='title'>Weather App</h1>
        <div className='container'>
          <DayCard />
          
        </div>
        { geoLocation.loading ? 
          <p>Loading</p>:
          <p> { geoLocation.lat } { geoLocation.lon } { geoLocation.city }, { geoLocation.stateT }, { geoLocation.country }</p>}
    </>
  )
}

export default App
