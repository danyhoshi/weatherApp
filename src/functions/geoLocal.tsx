export interface position {
  lat: number,
  lon: number
}

export interface positionComplete {
  lat: number,
  lon: number,
  city: string, 
  stateT: string, 
  country: string
}
export function getPosition() : Promise<position>{
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(pos){
        let latLon: position
        latLon = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        resolve(latLon);
      }) 
    })
  }

export let geoPosition = function() {
    getPosition().then(val => {
    // console.log("Mi posición: " + val.lon)
     return val
    })
}
