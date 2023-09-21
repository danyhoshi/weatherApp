import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getForecast } from '../redux/features/forescastSlice.tsx';
import { AppDispatch, RootState } from '../redux/store'
import { showTimeDay, dateFormat } from "../functions/hour.tsx";
interface Props {
  date: string,
  city: string,
  stateT: string,
  country: string,
  maxTemp: number,
  minTemp: number, 
  weathercode: string, 
  description: string
}
function DayCard(props: Props) {
 
  const { date, city, stateT, country, maxTemp, minTemp, weathercode, description } = props;
  console.log("weathercode: " + weathercode)
  return (
    <div className='containerDay'>
        <h2 className='place'>{city}, {stateT}, {country}</h2>
        <h3 className='day'>{ showTimeDay(date) }</h3>
        <h3 className='description'>{ description }</h3>
        <div className='containerIcon'>
            <img src={ weathercode } alt="forecast" style={ {width:"100", height: "100"}}/>
        </div>
        <p className='tempMaxMin'>MAX: { maxTemp }°C  &nbsp;&nbsp; MIN: { minTemp }°C </p>
        <p className='date'>{dateFormat(date)}</p>
    </div>
  )
}

export default DayCard;