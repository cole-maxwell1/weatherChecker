//Select elements
const iconElement = document.querySelector(".weather-icon");
const temperatueElement = document.querySelector(".temperature-value");
const descriptionElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

//Weather object
const weather = {};

//Added object data\
weather.temperatue = {
    unit : "celsius"
}

//Additonal variables
const unitKelvin = 273;
const apiKey = null; // Note: This will be a "burner" key

//Check browser for geolocation support
if (Geolocation in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't Support GeoLocation</p>`
}

//Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Get weather data
function getWeather(latitude, longitude){
    let openWeatherMapAPI = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

    fetch(openWeatherMapAPI)
    .then(function(response){
        let weatherData = response.json();
        return weatherData
    })
    .then(function())
}

//Display an error for issues getting users geo location
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//Convert temperatures