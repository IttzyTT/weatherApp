const container = document.querySelector('#mainContainer');
const errorTxt = document.querySelector('#error-txt');
const forcastContainer = document.querySelector('#forcastcontainer');
const forecastList = document.querySelector('.foreCastList');
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

    let date = new Date();
    let todayDate = new Date().toISOString().slice(8, 10);
    let month = date.toLocaleString('default', { month: 'short' }).slice(0, 3);

    let weatherHTML = '';
    weatherHTML += `<div id='content'>`;

    // Top Location
    weatherHTML += `<div id='up'>`;
    weatherHTML += `<h2 id='location'>${data.name}</h2>`;
    weatherHTML += `<p id='date'> Idag ${todayDate} ${month}</p>`;

    weatherHTML += `</div>`;

    // Middle icon and temp
    weatherHTML += `<div id='middle'>`;
    weatherHTML += `<div id="info">`;
    weatherHTML += `<img id="image" src="icons/${data.weather[0].icon}.png"></img>`;
    weatherHTML += `<p id="temp">${data.main.temp.toFixed()}</p>`;
    weatherHTML += `<p id="tempsign">°</p>`;

    weatherHTML += `</div>`;
    weatherHTML += `<div id="info1">`;
    weatherHTML += `<p id='description'>${data.weather[0].description}</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `</div>`;

    // Down section 1
    weatherHTML += `<div id="down1">`;
    weatherHTML += `<div id="info2">`;
    weatherHTML += `<p id="feelslike" class="weatherInfo widget">känns som</p>`;
    weatherHTML += `<p id="feelsLike" class="weatherInfo">${data.main.feels_like.toFixed()}°</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `<div id="info3">`;
    weatherHTML += `<p id="windspeed" class="weatherInfo widget">varmast</p>`;
    weatherHTML += `<p id="windSpeed" class="weatherInfo">${data.main.temp_max.toFixed()}°</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `<div id="info4">`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo widget">kallast</p>`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo">${data.main.temp_min.toFixed()}°</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `</div>`;
    // Down section 2
    weatherHTML += `<div id="down2">`;
    weatherHTML += `<div id="info5">`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo widget">vindstyrka</p>`;
    weatherHTML += `<p id="windSpeed" class="weatherInfo">${data.wind.speed} m/s</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `<div id="info6">`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo widget">luftfukt.</p>`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo">${data.main.humidity}%</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `<div id="info7">`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo widget">lufttryck</p>`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo">${data.main.pressure} hPa</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `</div>`;
    weatherHTML += `</div>`;

    container.innerHTML = weatherHTML;
  } catch (error) {
    errorTxt.innerText = 'Somthing went wront, please try agian';
  }
}

async function getforecastData() {
  let position = await getLocation();
  long = position.coords.longitude;
  lat = position.coords.latitude;

  try {
    let forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=current,minutely,hourly,alerts&lang=se&appid=3d8d2b2fa2b695d5367f55ec5c3000ab`
    );
    let forecastData = await forecastResponse.json();
    let forecasts = forecastData.daily;

    let forecastHTML = '';
    for (let forecast of forecasts) {
      console.log(forecast);

      forecastHTML += `<li>`;
      forecastHTML += `<div id="forcasts">`;
      // datum och tid
      forecastHTML += `<div class="forecastDateDiv">`;
      forecastHTML += `<h3 class="day1">${new Date(forecast.dt * 1000)
        .toDateString()
        .slice(0, 3)}</h3>`;
      forecastHTML += `<p class="day2">${new Date(forecast.dt * 1000)
        .toDateString()
        .slice(4, 11)}</p>`;
      forecastHTML += `</div>`;
      // Icon
      forecastHTML += `<div class="forecastIconDiv">`;
      forecastHTML += `<img class="forecastIcon" src="icons/${forecast.weather[0].icon}.png"></img>`;
      forecastHTML += `</div>`;
      // Temperatur
      forecastHTML += `<div class="forecastTemp">`;
      forecastHTML += `<h3 class="temp1">${forecast.temp.day.toFixed()}°</h3>`;
      forecastHTML += `<div class="forecastTempOpt">`;
      forecastHTML += `<p class="temp2">H:${forecast.temp.max.toFixed()}°</p>`;
      forecastHTML += `<p class="temp2">L:${forecast.temp.min.toFixed()}°</p>`;
      forecastHTML += `</div>`;
      forecastHTML += `</div>`;
      // vind
      forecastHTML += `<div class="forecastWindDiv">`;
      forecastHTML += `<p class="forecastWind">${forecast.wind_speed} m/s</p>`;
      forecastHTML += `</div>`;
      // Sol upp & ned
      forecastHTML += `<div class="forecastSunDiv">`;
      forecastHTML += `<img class="forecastSunImg"  src="sunrise.png" alt="sunrise"></img>`;
      forecastHTML += `<div class="arrowDiv">`;
      forecastHTML += `<div class="arrowUp">`;
      // tid uppgång
      forecastHTML += `<p class="suntime">↑ ${new Date(
        forecast.sunrise * 1000
      ).getHours()}:${new Date(forecast.sunrise * 1000).getMinutes()}</p>`;
      forecastHTML += `</div>`;
      forecastHTML += `<div class="arrowDown">`;
      // tid nedgång
      forecastHTML += `<p class="suntime">↓ ${new Date(
        forecast.sunset * 1000
      ).getHours()}:${new Date(forecast.sunset * 1000).getMinutes()}</p>`;
      forecastHTML += `</div>`;
      forecastHTML += `</div>`;
      forecastHTML += `</div>`;
      forecastHTML += `</div>`;
      forecastHTML += `</li>`;
    }
    forecastList.innerHTML = forecastHTML;
  } catch (error) {}
  errorTxt.innerText = 'Somthing went wront, please try agian';
}

// // Both functions
function allFunctions() {
  getLocation();
  getData();
  getforecastData();
}

window.onload = allFunctions;
