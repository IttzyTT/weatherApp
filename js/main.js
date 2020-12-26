let container = document.querySelector('#mainContainer');
const errorTxt = document.querySelector('#error-txt');

const apiKey = '9d3d0660cda4019f53f618d85e436849';

// Fetch function
async function getData() {
  try {
    let response = await fetch(
      'http://api.weatherstack.com/current?access_key=9d3d0660cda4019f53f618d85e436849&query=fetch:ip'
    );
    let data = await response.json();
    console.log(data);

    let weatherHTML = '';
    weatherHTML += `<div id='content'>`;

    weatherHTML += `<div id='up'>`;
    weatherHTML += `<img id="image" src="${data.current.weather_icons}"</img>`;
    weatherHTML += `<p id='description'>${data.current.weather_descriptions}</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id='middle'>`;
    weatherHTML += `<h2 id='location'>${data.location.name}, </h2>`;
    weatherHTML += `<p id='region'>${data.location.region}</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="down">`;
    weatherHTML += `<div id="info1">`;
    weatherHTML += `<p id="temp" class="weatherInfo">Temprature</p>`;
    weatherHTML += `<p id="temp" class="weatherInfo">${data.current.temperature} °C</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="info2">`;
    weatherHTML += `<p id="temp" class="weatherInfo">Feels Like</p>`;
    weatherHTML += `<p id="feelsLike" class="weatherInfo">${data.current.feelslike} °C</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="info3">`;
    weatherHTML += `<p id="temp" class="weatherInfo">Wind Speed</p>`;
    weatherHTML += `<p id="windSpeed" class="weatherInfo">${data.current.wind_speed} m/s</p>`;
    weatherHTML += `</div>`;

    weatherHTML += `<div id="info4">`;
    weatherHTML += `<p id="temp" class="weatherInfo">Cloudcover</p>`;
    weatherHTML += `<p id="cloudcover" class="weatherInfo">${data.current.cloudcover}%</p>`;
    weatherHTML += `</div>`;
    weatherHTML += `</div>`;

    weatherHTML += `</div>`;

    container.innerHTML = weatherHTML;
  } catch (error) {
    errorTxt.innerText = 'Somthing went wront, please try agian';
  }
}

window.onload = getData;
