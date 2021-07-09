//Select elements
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//Weather object
const weather = {};

//Add a unit to the temp (For conversion)
weather.temperature = {
    unit: "celsius"
}

//Additional variables
const unitKelvin = 273;
const apiKey = "da3f3efb9bb0be7c851d42c3f17bd458"; // Note: This will be a "burner " key

//Check browser for geolocation support
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't Support GeoLocation</p>`
}

//Set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Display an error for issues getting users geo location
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//Get weather data using the latitude/longitude gather from the browser
function getWeather(latitude, longitude) {
    let openWeatherAPI = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(openWeatherAPI)
        .then(function(response) {
            let weatherData = response.json();
            return weatherData;
        })
        .then(function(weatherData) {
            //extract weather data
            weather.temperature.value = Math.floor(weatherData.main.temp - unitKelvin);
            weather.description = weatherData.weather[0].description;
            weather.iconId = weatherData.weather[0].icon;
            weather.city = weatherData.name;
            weather.country = weatherData.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

//Displays weather data to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

//Convert temperatures (Celsius -> Fahrenheit)
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32
}

//Temperature conversion when user clicks temperatureElement
temperatureElement.addEventListener("click", function() {
    if (weather.temperature.value == undefined) return;

    if (weather.temperature.unit == "celsius") {
        //conversion to fahrenheit
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        //Set element
        temperatureElement.innerHTML = `${fahrenheit}°<span>C</span>`;
        //Change unit
        weather.temperature.unit = "fahrenheit";
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})