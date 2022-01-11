export default class BikeService {
  static findBike(distance, zipCode) {
    return fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=100&location=${zipCode}&distance=${distance}&stolenness=proximity`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}