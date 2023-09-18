import './App.css'
import ListCards from './components/ListCards.tsx';
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getForecast } from './redux/features/forescastSlice.tsx';
import { AppDispatch, RootState } from './redux/store'
  //import { ThunkDispatch } from "@reduxjs/toolkit"; //se importa para que no de problema el tipado del dispatch de thunks
function App() {

  //   const  forecast  = useSelector((state: RootState) => state.forecast)
  //  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  //  const dispatch = useDispatch<AppDispatch>();
  
  // useEffect(() => {
  //   dispatch(getForecast())
  // }, [])
   
   return (
    <>
        <h1 className='title'>Weather App</h1>
       
          <ListCards />
          
      
        {/* { forecast.loading ? 
          <p>Loading</p>:
          <p> { forecast.lat } { forecast.lon } { forecast.city }, { forecast.stateT }, { forecast.country }</p>} */}
    </>
  )
}

export default App
