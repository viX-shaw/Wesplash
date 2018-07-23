const APP_ACCESS_KEY = "967ff20e408fe899d9c0ae78e2784ed0b96f568db3dba8458b2e396e4b2e04c1";
const APP_SECRET = "ef2d133433499b5264fe0c1c006df9554386591592a3735d7b82ee8c54e21f48";
const CALLBACK_URL = "urn:ietf:wg:oauth:2.0:oob";
const WEATHER_API_KEY = "1c33876cbff90f04447a6f8bc3674804";
var text = "";

const xhr = new XMLHttpRequest();

let localWeather = document.querySelector('body');

const updateBackground = function() {
  xhr.open("GET", `https://api.unsplash.com/photos/random?client_id=${APP_ACCESS_KEY}`, true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let response = JSON.parse(xhr.response)
      response.urls.full ? localWeather.style.background = `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${response.urls.regular})no-repeat center/100% fixed` : null
      getWeatherDetails();     
    }
    else {
      //setDefaultBackground(weather)
    }
  }
  xhr.send()
}
const getWeatherDetails = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}
}
function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
   // console.log('Your latitude is :'+lat+' and longitude is '+long);
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appId=${WEATHER_API_KEY}`, true);
    xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      let response = JSON.parse(xhr.response)
      //console.log(response);
      text = `Weather in ${response.name} be like ${response.weather[0].main}`
      showPanel(text);
    }else{
      
    }
  }
xhr.send();
}

function showPanel(fieldName) {
  var fieldNameElement = document.getElementById("weather");
 // console.log(fieldNameElement);
  var para = document.createElement("P");                      
  var t = document.createTextNode(fieldName);    
  para.appendChild(t); 
  fieldNameElement.appendChild(para);
  startTime();
}

function errorFunction() {
   alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    var element=document.getElementById("time");
    element.appendChild(document.createTextNode(`${h}:${m}`));
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
updateBackground();
//getWeatherDetails();