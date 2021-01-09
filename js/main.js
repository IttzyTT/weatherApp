const container = document.querySelector('#mainContainer');
const errorTxt = document.querySelector('#error-txt');
const forcastContainer = document.querySelector('#forcastcontainer');
let long;
let lat;

function getLocation() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
}

// Fetch function
async function getData() {
  let position = await getLocation();
  long = position.coords.longitude;
  lat = position.coords.latitude;

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=se&appid=3d8d2b2fa2b695d5367f55ec5c3000ab`
    );
    let data = await response.json();

    let weatherHTML = '';
    weatherHTML += `<div id='content'>`;

    weatherHTML += `<div id='up'>`;
    weatherHTML += `<h2 id='location'>${data.name}</h2>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id='middle'>`;
    weatherHTML += `<div id="info">`;
    weatherHTML += `<img id="image" src="icons/${data.weather[0].icon}.png"</img>`;
    weatherHTML += `<p id='description'>${data.weather[0].description}</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `<div id="info1">`;
    weatherHTML += `<p id="temp">${data.main.temp.toFixed()}</p>`;
    weatherHTML += `<p id="tempsign"> °</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="down">`;
    weatherHTML += `<div id="info2">`;
    weatherHTML += `<p id="feelslike" class="weatherInfo widget">Känns som</p>`;
    weatherHTML += `<p id="feelsLike" class="weatherInfo">${data.main.feels_like.toFixed()} °C</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="info3">`;
    weatherHTML += `<p id="windspeed" class="weatherInfo widget">Vind</p>`;
    weatherHTML += `<p id="windSpeed" class="weatherInfo">${data.wind.speed} m/s</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="info4">`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo widget">Lufttryck</p>`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo">${data.main.pressure} hPa</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `</div>`;

    weatherHTML += `</div>`;

    container.innerHTML = weatherHTML;
  } catch (error) {
    errorTxt.innerText = 'Somthing went wront, please try agian';
  }
}

// async function getforecastData() {
//   let position = await getLocation();
//   long = position.coords.longitude;
//   lat = position.coords.latitude;

//   try {
//     let forecastResponse = await fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=se&cnt=5&appid=3d8d2b2fa2b695d5367f55ec5c3000ab`
//     );
//     let forecastData = await forecastResponse.json();

//     let forcastHTML = '';
//     for (let forcast of forecastData.list) {
//       console.log(forcast);
//     }
//   } catch (error) {}
//   errorTxt.innerText = 'Somthing went wront, please try agian';
// }

// // Both functions
function allFunctions() {
  getLocation();
  getData();
  // getforecastData();
}

window.onload = allFunctions;
