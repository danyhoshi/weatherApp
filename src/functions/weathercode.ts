let weathercode = new Map();

weathercode.set(0, '../assets/day.svg'); //Clear sky
weathercode.set(1, '../assets/cloudy-day-1.svg'); //Mainly clear
weathercode.set(2, '../assets/cloudy-day-3.svg'); //partly cloudy
weathercode.set('0N', '../assets/night.svg');
weathercode.set('1N', '../assets/cloudy-night-1.svg');
weathercode.set('2N', '../assets/cloudy-night-3.svg');
weathercode.set('3N', '../assets/cloudy.svg');
weathercode.set(3, '../assets/cloudy.svg'); //overcast
weathercode.set(45, '../assets/cloudy.svg'); //Fog
weathercode.set(61, '../assets/rainy-4.svg'); // Rain: Slight  
weathercode.set(63, '../assets/rainy-5.svg');// Rain: Moderate 
weathercode.set(65, '../assets/rainy-6.svg'); // Rain: Heavy
weathercode.set(80, '../assets/rainy-4.svg'); //Rain Showers Slight
weathercode.set(81, '../assets/rainy-5.svg'); // Rain Showers Moderate
weathercode.set(82, '../assets/rainy-6.svg'); // Rain Showers Violent
weathercode.set(85, '../assets/snowy-4.svg'); //Snow Showers
weathercode.set(71, '../assets/snowy-4.svg'); // Snow Fall: Slight intensity
weathercode.set(73, '../assets/snowy-5.svg'); //Snow Fall: Moderate intensity
weathercode.set(75, '../assets/snowy-6.svg'); //Snow Fall: Moderate intensity  
weathercode.set(85, '../assets/snowy-4.svg'); // Snow Showers Slight
weathercode.set(86, '../assets/snowy-6.svg'); // Snow Showers Heavy
weathercode.set(95, '../assets/thunder.svg'); //Thunderstorm
weathercode.set(96, '../assets/thunder.svg'); //Thunderstorm with hail
export default weathercode;