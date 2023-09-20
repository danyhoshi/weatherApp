import DayCard from './DayCard.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.tsx'
import  weathercode  from "../functions/weathercode.ts"


function ListCards() {
    
    const  forecast  = useSelector((state: RootState) => state.forecast)
    //const dispatch = useDispatch<AppDispatch>();
    /*TODO: SEPARAR GEOPOSITION
                   EL QUE TOMA LOS NOMBRES DE LOS LUGARES
                   EL FORECAST
    LLAMAR CON DISPACH AQUI EN EL USEEFFECT Y PASAR LO NECESARIO COMO PARAMETROS
   */

 
  return (
    <div className='container'>
        {forecast.dataF.time.map((date, index) => {
                return (<div key = {date} >
                    <DayCard date={ date }
                            city={ forecast.city }
                            stateT= { forecast.stateT }
                            country= { forecast.country }
                            maxTemp= { forecast.dataF.maxTemp[index] }
                            minTemp= { forecast.dataF.minTemp[index]}
                            weathercode = { weathercode.get(forecast.dataF.weathercode[index])  }    
                    />
              </div>)
            })}
            
    </div>
  )
}

export default ListCards