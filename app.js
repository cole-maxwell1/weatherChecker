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
const apiKep = null; // Note: This will be a "burner" key