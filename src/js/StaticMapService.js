export default class StaticMapService {
  static getMap(lon, lat) {
    return fetch(`https://maps.locationiq.com/v3/staticmap?key=pk.0f4a938d4828b004273ae4bfcb2f01d1&center=${lon},${lat}&zoom=13`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}