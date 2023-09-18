function DayCard() {
  return (
    <div className='containerDay'>
        <h2 className='place'>Maracay</h2>
        <h3 className='day'>Sunday</h3>
        <div className='containerIcon'>
            <img src="" alt="forecast" style={ {width:"100", height: "100"}}/>
        </div>
        <p className='tempMaxMin'>tempMax°C  tempMin °C </p>
        <p className='date'>17/09/2023</p>
    </div>
  )
}

export default DayCard;