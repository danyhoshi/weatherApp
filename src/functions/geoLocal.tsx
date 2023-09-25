export interface position {
  lat: number,
  lon: number
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

