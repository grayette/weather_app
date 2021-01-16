let now = new Date();

let h3 = document.querySelector("h3");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  updatedCity(cityInput.value);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", search);

function showWeather(response) {
  let h4 = document.querySelector("h4");
  let temperature = Math.round(response.data.main.temp);
  h4.innerHTML = `Currently ${temperature}° in ${response.data.name}`;
}

function getLocation(position) {
  let apiKey = "32bd54b4ddf4f40754bec75b75d32637";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(getLocation);

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationButton = document.querySelector("#current");
locationButton.addEventListener("click", retrievePosition);

function updatedCity(city) {
  let apiKey = "32bd54b4ddf4f40754bec75b75d32637";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(`${apiUrl}&units=metric`).then(showWeather);
}
