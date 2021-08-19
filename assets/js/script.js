var submitBtn = document.getElementById("submit-button");
var cityName = document.getElementById("city-name");
var cityNameDisplay = document.getElementById("city-name-main");
var tempMain = document.getElementById("main-temp");
var windMain = document.getElementById("main-wind");
var humidityMain = document.getElementById("main-humidity");
var uvIndexMain = document.getElementById("span");
var forcastDisplay = document.getElementById("forecast-display");
var previousSearch = document.getElementById("previous-search");
var weatherInfo = [];

submitBtn.addEventListener("click", searchAPI);

function searchAPI() {
  event.preventDefault();
  var search = document.getElementById("city-name");
  var cityName = search.value.trim();
  search.value = "";
  var weatherURL =
    "https://api.weatherapi.com/v1/forecast.json?key=f3dd10a5b85d43bea96181956211608&q=" +
    cityName +
    "&days=6&aqi=no&alerts=no";

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var locationCity = data.location.name;
      var locationState = data.location.region;
      var currentDate = data.forecast.forecastday[0].date;
      var currentTemp = data.current.temp_f;
      var currentWind = data.current.wind_mph;
      var currentHumidity = data.current.humidity;
      var currentUvIndex = data.current.uv;
      weatherInfo = [];
      for (var i = 1; i < 6; i++) {
        var futureDate = data.forecast.forecastday[i].date;
        var futureTemp = data.forecast.forecastday[i].day.avgtemp_f;
        var futureWind = data.forecast.forecastday[i].day.maxwind_mph;
        var futureHumidity = data.forecast.forecastday[i].day.avghumidity;
        var futureIcon = data.forecast.forecastday[i].day.condition.icon;
        var weatherObj = {
          date: futureDate,
          icon: futureIcon,
          temp: futureTemp,
          wind: futureWind,
          humidity: futureHumidity,
        };
        weatherInfo.push(weatherObj);
      }
      console.log(weatherInfo);
      cityNameDisplay.textContent =
        locationCity + ", " + locationState + " (" + currentDate + ")";
      tempMain.textContent = "Current Temp: " + currentTemp + "℉";
      windMain.textContent = "Wind: " + currentWind + "mph";
      humidityMain.textContent = "Humidity: " + currentHumidity + "%";
      uvIndexMain.textContent = "UV Index: " + currentUvIndex;
      renderForecast();
      weatherInfo = [];
      weatherObj = {};
    });
}

function renderForecast() {
  clearForecast();
  weatherInfo.forEach((item) => {
    var createCard = document.createElement("div");
    createCard.classList.add("card");
    var createCardBody = document.createElement("div");
    createCardBody.classList.add("card-body");
    var cardDate = document.createElement("h6");
    cardDate.textContent = item.date;
    createCardBody.appendChild(cardDate);
    var icon = document.createElement("img");
    console.log(item.icon);
    icon.src = "https:" + item.icon;
    cardDate.appendChild(icon);
    /*Add in icon
    =============
    =============
    ============*/
    var infoList = document.createElement("ul");
    var tempList = document.createElement("li");
    tempList.textContent = "Temp: " + item.temp + "℉";
    var windList = document.createElement("li");
    windList.textContent = "Wind: " + item.wind;
    var humidityList = document.createElement("li");
    humidityList.textContent = "Humidity: " + item.humidity + "%";
    infoList.appendChild(tempList);
    infoList.appendChild(windList);
    infoList.appendChild(humidityList);
    createCardBody.appendChild(infoList);
    createCard.appendChild(createCardBody);
    forcastDisplay.appendChild(createCard);
  });
}

function clearForecast() {
  //set the forcast display to empty
  forcastDisplay.innerHTML = "";
}
