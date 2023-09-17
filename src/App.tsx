import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DayCard from './components/DayCard'
function App() {
   return (
    <>
      <h1 className='title'>Weather App</h1>
      <div className='container'>
        <DayCard />
      </div>
    </>
  )
}

export default App
