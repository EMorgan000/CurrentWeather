/// Dev:       Eric Morgan
/// Date:      12/16/21
/// Filename:  scripts.js
/// Validates zip code input and passes the values to the api call


var dynamicDiv = document.getElementById("dynam"); // div holding the card
var search = document.getElementById("search"); // search button 
var validZip = /^\d{5}(?:[-\s]\d{4})?$/; // regex for a 5 digit US zip code
var rdoFahrenheit; // radio buttons for fahrenheit and celsius
var rdoCelsius;
var zipCode = document.getElementById('zip'); // form zip code input

rdoFahrenheit = document.getElementById('flexRadioDefault1'); // individual radio buttons
rdoCelsius = document.getElementById('flexRadioDefault2');

window.addEventListener("load", function () {
    search.addEventListener('click', validate) // initiate search button with validation method
});

// validate the zip code input
function validate() {
    var zipError = document.getElementById("zipError"); // span element hidden until an error triggers

    if (zipCode.value == "") { // zip cannot be blank; turn input and error text red
        zipCode.style.background = "#FF0000";
        zipError.style.display = "inline";
        zipError.style.color = "#FF0000";
        zipError.innerHTML = "Zip code cannot be blank.";
    } else if (zipCode.value.length < 5 && zipCode.value.length > 0) { // zip can't be less than 5 characters
        zipCode.style.background = "#FF0000";
        zipError.style.display = "inline";
        zipError.style.color = "#FF0000";
        zipError.innerHTML = "Zip code must be at least 5 numbers.";
    } else if (!validZip.test(zipCode.value)) { // triggers if regex catches an invalid zip
        zipCode.style.background = "#FF0000";
        zipError.style.display = "inline";
        zipError.style.color = "#FF0000";
        zipError.innerHTML = "Invalid zipcode. Make sure you are entering a 5 digit, US, zip code.";
    } else {
        zipCode.style.background = "rgb(255,255,255)"; // if zip is good, clear the input of error color and error text
        zipError.innerHTML = "";
        getWeatherData(); // calling weather data method
    }

}

// DOM elements needed to build a card
var weatherDiv = document.createElement('div');
var body = document.createElement('div');
var picDiv = document.createElement('div');
var pic = document.createElement('img');
var txt = document.createElement('h3');
var txt2 = document.createElement('h5');
var txt3 = document.createElement('h6');
var txt4 = document.createElement('h6');
var txt5 = document.createElement('h6');
var txt6 = document.createElement('h6');
var txt7 = document.createElement('h6');

// assigning classnames and styles to these elements
weatherDiv.className = 'card';
weatherDiv.style = 'width: 50rem';
body.className = 'card-body';
txt.className = 'card-title';
txt2.className = 'card-text ';
txt3.className = 'card-text';
txt4.className = 'card-text';
txt5.className = 'card-text';
txt6.className = 'card-text';
txt7.className = 'card-text';

// Return weather data using the imperial or metric system; depends on which radio button is checked
function getWeatherData() {
    if (rdoFahrenheit.checked) { // chose fahrenheit                                                 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zipCode.value},us&appid=48a4cd2cae19e344d0682ba156e1ce1c`) // add in zip code input value
            .then((response) => {

                crtWeather = response.data; // response object

                // Building card with response object
                txt2.innerHTML = crtWeather.name;
                txt.innerHTML = Math.floor(crtWeather.main.temp) + "&#176;F";   // making sure we're in Fahrenheit
                pic.src = `http://openweathermap.org/img/wn/${crtWeather.weather[0].icon}@2x.png`;  // this db's image formatting
                txt3.innerHTML = "Current weather: " + crtWeather.weather[0].description;
                txt4.innerHTML = "Feels like: " + Math.floor(crtWeather.main.feels_like) + "&#176;F";
                txt5.innerHTML = "Humidity: " + crtWeather.main.humidity + "%";
                txt6.innerHTML = "High " + Math.floor(crtWeather.main.temp_max) + "&#176;F";
                txt7.innerHTML = "Low " + Math.floor(crtWeather.main.temp_min) + "&#176;F";

                weatherDiv.appendChild(picDiv); // adding this info to the divs
                picDiv.appendChild(pic)
                weatherDiv.appendChild(body);
                body.appendChild(txt);
                body.appendChild(txt2);
                body.appendChild(txt3);
                body.appendChild(txt4);
                body.appendChild(txt5);
                body.appendChild(txt6);
                body.appendChild(txt7);
                dynamicDiv.appendChild(weatherDiv);
                console.log(crtWeather.weather[0].description); // test to see if info is going through once things are validated

            })
    } else {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${zipCode.value},us&appid=48a4cd2cae19e344d0682ba156e1ce1c`)
            .then((response) => {
                crtWeather = response.data;

                txt2.innerHTML = crtWeather.name;
                txt.innerHTML = Math.floor(crtWeather.main.temp) + "&#176;C";   // Swapping units to Celsius
                pic.src = `http://openweathermap.org/img/wn/${crtWeather.weather[0].icon}@2x.png`;
                txt3.innerHTML = "Current weather: " + crtWeather.weather[0].description;
                txt4.innerHTML = "Feels like: " + Math.floor(crtWeather.main.feels_like) + "&#176;C";
                txt5.innerHTML = "Humidity: " + crtWeather.main.humidity + "%";
                txt6.innerHTML = "High " + Math.floor(crtWeather.main.temp_max) + "&#176;C";
                txt7.innerHTML = "Low " + Math.floor(crtWeather.main.temp_min) + "&#176;C";

                weatherDiv.appendChild(picDiv);
                picDiv.appendChild(pic);
                weatherDiv.appendChild(body);
                body.appendChild(txt);
                body.appendChild(txt2);
                body.appendChild(txt3);
                body.appendChild(txt4);
                body.appendChild(txt5);
                body.appendChild(txt6);
                body.appendChild(txt7);
                dynamicDiv.appendChild(weatherDiv);
                console.log(crtWeather.weather[0].description);

            })
    }
}