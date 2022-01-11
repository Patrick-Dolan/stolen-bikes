import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/BikeService.js';
import StaticMapService from "./js/StaticMapService";

function clearFields() {
  $('#searchDistance').val("");
  $("#searchZip").val("");
  $('.results').text("");
}

function processBikeInformation(response) {
  let htmlForBikes = "";
  for (let i = 0; i < response.bikes.length; i++) {
    let bikeImage = "https://cdn.pixabay.com/photo/2014/04/03/11/07/bicycle-311808_960_720.png";
    let coordinate = "";
    let description = "";
    if (response.bikes[i].thumb !== null) {
      bikeImage = response.bikes[i].thumb;
    }
    if (response.bikes[i].stolen_coordinates !== null) { 
      coordinate= response.bikes[i].stolen_coordinates;
    }
    let d = new Date((response.bikes[i].date_stolen*1000));
    let shortDate = d.toLocaleDateString('en-US');
    if (response.bikes[i].description !== null) {
      description = `<p class="card-text">${response.bikes[i].description}</p>`;
    }
    htmlForBikes += `
    <div class="col">
      <div class="card">
        <img class="card-img-top img-thumbnail" src="${bikeImage}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${response.bikes[i]["title"]}</h5>
          ${description}
          <ul>
            <li><strong>Manufacturer:</strong> ${response.bikes[i].manufacturer_name}</li>
            <li><strong>Year of manufacture:</strong> ${response.bikes[i].year}</li>
            <li><strong>Reported Stolen:</strong> ${shortDate}</li>
            <li><strong>Where it was Stolen:</strong> ${coordinate}</li>
            <li><strong>Serial Number:</strong> ${response.bikes[i].serial}</li>
          </ul>
          <div class="bikeMap">
            <img id="map${[i]}" src="">
          </div>
        </div>
      </div>
    </div>
    `;
  }
  return htmlForBikes;
}

function displayBikeInformation(bikeInformation, bikeObjects) {
  $('#resultSummary').html(`<br><p>${bikeObjects.bikes.length} bikes stolen in this area, the following bikes were found:</p>`)
  $('#results').html(`${bikeInformation}`);
}

// function makeMapApiCalls(bikeObjects) {
//   let bikeMaps = [];
//   for (let i = 0; i < 1; i++)
//     StaticMapService.getMap(bikeObjects[0].bikes["bikes"][i]["stolen_coordinates"][0], bikeObjects[0].bikes["bikes"][i]["stolen_coordinates"][0])
//       .then((mapResponse) => {
//         if (mapResponse instanceof Error) {
//           throw Error(`LocationIQ API error: ${mapResponse.message}`);
//         }
        
//       });
// }

$(document).ready(function() {
  $('#findBike').submit(function(event) {
    event.preventDefault();
    let distance = $('#searchDistance').val();
    let zipCode = $('#searchZip').val();
    let bikeInformation = "";
    let bikeObjects = [];
    clearFields();
    BikeService.findBike(distance, zipCode)
      .then((bikeResponse) => {
        if (bikeResponse instanceof Error) {
          throw Error(`BikeService API error: ${bikeResponse.message}`);
        }
        bikeInformation = processBikeInformation(bikeResponse);
        bikeObjects = bikeResponse;
        displayBikeInformation(bikeInformation, bikeObjects);
        // return makeMapApiCalls(bikeObjects);
      })
      // .then((mapResponse) => {

      // });
  });
});