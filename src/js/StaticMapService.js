export default class StaticMapService {
  static getMap(bikeResponse) {
    let lat = 0;
    let lon = 0;
    for(let i = 0; i < bikeResponse.bikes.length; i++) {
      if (bikeResponse.bikes[i].stolen_coordinates !== null) { 
        lat = bikeResponse.bikes[i].stolen_coordinates[0];
        lon = bikeResponse.bikes[i].stolen_coordinates[1];
        i = bikeResponse.bikes.length;
      }
    }
    return fetch(`https://maps.locationiq.com/v3/staticmap?key=pk.0f4a938d4828b004273ae4bfcb2f01d1&center=${lat},${lon}&zoom=13`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return `https://maps.locationiq.com/v3/staticmap?key=pk.0f4a938d4828b004273ae4bfcb2f01d1&center=${lat},${lon}&zoom=13`;
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}