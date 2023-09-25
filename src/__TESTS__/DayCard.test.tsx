import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import DayCard from '../components/DayCard'
import type { PreloadedState } from '@reduxjs/toolkit'
import weathercode from '../functions/weathercode'
import '@testing-library/jest-dom';
import {prettyDOM} from '@testing-library/dom'
import { RootState } from '../redux/store'

describe("AppCard", () => {

  beforeEach(() => {
    const initialState = {
      forecast:
        {loading:false,lat:10.2627971,lon:-67.5788694,dataF:{time:['2023-09-22','2023-09-23','2023-09-24','2023-09-25','2023-09-26','2023-09-27','2023-09-28'],weathercode:[3,3,3,3,80,80,80],maxTemp:[32.5,32.8,33.4,34.3,31.7,32.3,34.3],minTemp:[25.4,25.1,25.4,25.3,25.4,25.7,25.5],description:['Overcast','Overcast','Overcast','Overcast','Rain Showers Slight','Rain Showers Slight','Rain Showers Slight']},error:null}, 
      namePlace:
        {loading:false,city:'Parroquia Las Delicias',stateT:'Aragua State',country:'VE'}}

    renderWithProviders(<DayCard  date={ initialState.forecast.dataF.time[0] }
      city={ initialState.namePlace.city }
      stateT= { initialState.namePlace.stateT }
      country= { initialState.namePlace.country }
      maxTemp= { initialState.forecast.dataF.maxTemp[0] }
      minTemp= { initialState.forecast.dataF.minTemp[0]}
      weathercode = { weathercode.get(initialState.forecast.dataF.weathercode[0]) }
      description = {initialState.forecast.dataF.description[0] } />)
  })
  test("Render the name of place where we are", () => {      
      const country = screen.getByText(/Parroquia Las Delicias, Aragua State, VE/i);
      // console.log("imprimiendo pretty")
      // console.log(prettyDOM(country));
      expect(country).toBeInTheDocument();
  })
  test("Render the date given to initialState 22-09-2023", () => {      
    const date = screen.getByText(/22-09-2023/i);
//    console.log(prettyDOM(date));
    expect(date).toBeInTheDocument();
  })

  test("Render the description given to initialState Overcast", () => {      
    const description = screen.getByRole("heading", {name: /Overcast/i});
  //  console.log(prettyDOM(description));
    expect(description).toBeInTheDocument();
  })

  test("Render the max temp given to initialState 32.5", () => {      
    const maxMinTemp = screen.getByText(/32.5/i);
    //console.log(prettyDOM(maxMinTemp));
    expect(maxMinTemp).toBeInTheDocument();
  })

  test("Render the min temp given to initialState 25.4", () => {      
    const maxMinTemp = screen.getByText(/25.4/i);
    //console.log(prettyDOM(maxMinTemp));
    expect(maxMinTemp).toBeInTheDocument();
  })

  test("Render the day given to initialState Friday", () => {      
    const day = screen.getByRole("heading", {name: /Friday/i});
    //console.log(prettyDOM(day));
    expect(day).toBeInTheDocument();
  })

  test("Render the day given to initialState Friday", () => {      
    const iconForecast = screen.getByAltText(/forecast/i)
    //console.log(prettyDOM(iconForecast));
    expect(iconForecast).toBeInTheDocument();
  })

})