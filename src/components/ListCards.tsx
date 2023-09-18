import React from 'react'
import DayCard from './DayCard.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { getForecast } from '../redux/features/forescastSlice.tsx';
import { AppDispatch, RootState } from '../redux/store.tsx'
import  weathercode  from "../functions/weathercode.ts"

function ListCards() {
    
    const  forecast  = useSelector((state: RootState) => state.forecast)
    const dispatch = useDispatch<AppDispatch>();
    React.useEffect(() => {
        dispatch(getForecast())
      }, [])
  return (
    <div className='container'>
        {forecast.dataF.time.map((date, index) => {
                return (<div key = {date} >
                    <DayCard date={ date }
                            city={ forecast.city }
                            stateT= { forecast.stateT }
                            country= { forecast.country }
                            maxTemp= { forecast.dataF.temperature_2m_max[index] }
                            minTemp= { forecast.dataF.temperature_2m_min[index]}
                            weathercode = { weathercode.get(forecast.dataF.weathercode[index])  }    
                    />
              </div>)
            })}
            
    </div>
  )
}

export default ListCards