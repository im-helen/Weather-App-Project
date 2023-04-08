function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  return `${day}  ${hour}:${minutes}`;
}

function celsiusTemperature() {
  let currentTemperature = document.querySelector("h2.current-temperature");
  currentTemperature.innerHTML = 10;
}

function fahrenheitTemperature() {
  let currentTemperature = document.querySelector("h2.current-temperature");
  let celsius = currentTemperature.innerHTML;
  celsius = Number(celsius);
  currentTemperature.innerHTML = Math.round((celsius * 9) / 5 + 32);
}

function searchCityTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h2.current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  document.querySelector("h1").innerHTML = `${cityInput.value}`;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

function findCurrentLocation(position) {
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

function defaultCity(city) {
  let heading = document.querySelector("h1");
  let apiKey = "b9ba0314a93083136d968577c718e31d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  heading.innerHTML = city;
  axios.get(`${apiUrl}`).then(searchCityTemperature);
}

function runNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentTimeElement = document.querySelector("#current-time");
let now = new Date();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
currentTimeElement.innerHTML = formatDate(now);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", runNavigator);

defaultCity("New York");
