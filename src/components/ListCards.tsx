import DayCard from './DayCard.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.tsx'
import  weathercode  from "../functions/weathercode.ts"


function ListCards() {
    
    const  forecast  = useSelector((state: RootState) => state.forecast)
    const  place  = useSelector((state: RootState) => state.namePlace)
    //const dispatch = useDispatch<AppDispatch>();
    /*TODO: SEPARAR GEOPOSITION
                   EL QUE TOMA LOS NOMBRES DE LOS LUGARES
                   EL FORECAST
    LLAMAR CON DISPACH AQUI EN EL USEEFFECT Y PASAR LO NECESARIO COMO PARAMETROS
   */

 
  return (
    <div className='container'>
       {(!place.country) || forecast.loading ? <p>Loading ...</p> :
       forecast.dataF.time.map((date, index) => {
                return (<div key = {date} >
                    <DayCard date={ date }
                            city={ place.city }
                            stateT= { place.stateT }
                            country= { place.country }
                            maxTemp= { forecast.dataF.maxTemp[index] }
                            minTemp= { forecast.dataF.minTemp[index]}
                            weathercode = { weathercode.get(forecast.dataF.weathercode[index]) }
                            description = {forecast.dataF.description[index] }      
                    />
              </div>)
            })}
            
    </div>
  )
}

export default ListCards