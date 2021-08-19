var submitBtn = document.getElementById("submit-button");
var search = document.getElementById("city-name");
var cityNameDisplay = document.getElementById("city-name-main");
var tempMain = document.getElementById("main-temp");
var windMain = document.getElementById("main-wind");
var humidityMain = document.getElementById("main-humidity");
var uvIndexMain = document.getElementById("span");
var forcastDisplay = document.getElementById("forecast-display");
var previousSearchDiv = document.getElementById("previous-search");
var weatherInfo = [];
var previousSearch = [];
var prevButton = document.querySelectorAll(".previous-button");

submitBtn.addEventListener("click", searchAPI);
displayPrevOnLoad();
function searchAPI() {
  event.preventDefault();
  // var search = document.getElementById("city-name");
  var cityName = search.value.trim();

  console.log(previousSearch);

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
      var currentIcon = data.current.condition.icon;
      var iconImg = document.createElement("img");
      console.log(iconImg);
      iconImg.src = "https:" + currentIcon;
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
      cityNameDisplay.appendChild(iconImg);
      tempMain.textContent = "Current Temp: " + currentTemp + "℉";
      windMain.textContent = "Wind: " + currentWind + "mph";
      humidityMain.textContent = "Humidity: " + currentHumidity + "%";
      uvIndexMain.textContent = "UV Index: " + currentUvIndex;
      saveSearch();
      renderForecast();
      weatherInfo = [];
      weatherObj = {};
    });
}

function saveSearch() {
  //get the local storage variable
  var savedCities = localStorage.getItem("city");
  // parse the local storage
  var parseSavedCities = [];
  if (savedCities) {
    parseSavedCities = JSON.parse(savedCities);
  }
  //push the new city into variable
  var cityName = search.value.trim();
  parseSavedCities.push(cityName);
  // previousSearch.push(cityName);
  localStorage.setItem("city", JSON.stringify(parseSavedCities));
  //add render to saveSearch
  previousSearchDiv.innerHTML = "";
  parseSavedCities.forEach((item) => {
    var createButton = document.createElement("button");
    createButton.classList.add(
      "btn",
      "btn-outline-primary",
      "btn-block",
      "my-2",
      "previous-button"
    );
    createButton.textContent = item;
    previousSearchDiv.appendChild(createButton);
  });
}
function renderForecast() {
  clearForecast();
  weatherInfo.forEach((item) => {
    //create the card div and add card class
    var createCard = document.createElement("div");
    createCard.classList.add("card");
    //create the cardbody div and add card-body class
    var createCardBody = document.createElement("div");
    createCardBody.classList.add("card-body");
    //create the cardDate h6 and add the date content
    var cardDate = document.createElement("h6");
    cardDate.textContent = item.date;
    createCardBody.appendChild(cardDate);
    //create and img element and add the src
    var icon = document.createElement("img");
    // console.log(item.icon);
    icon.src = "https:" + item.icon;
    createCardBody.appendChild(icon);
    //create the info list
    var infoList = document.createElement("ul");
    //add temp wind and humidity li plus the content
    var tempList = document.createElement("li");
    tempList.textContent = "Temp: " + item.temp + "℉";
    var windList = document.createElement("li");
    windList.textContent = "Wind: " + item.wind;
    var humidityList = document.createElement("li");
    humidityList.textContent = "Humidity: " + item.humidity + "%";
    //append li to info list
    infoList.appendChild(tempList);
    infoList.appendChild(windList);
    infoList.appendChild(humidityList);
    //append info list
    createCardBody.appendChild(infoList);

    createCard.appendChild(createCardBody);
    forcastDisplay.appendChild(createCard);
  });
}

function clearForecast() {
  //set the forcast display to empty
  forcastDisplay.innerHTML = "";
  search.value = "";
}

function displayPrevOnLoad() {
  var savedCities = localStorage.getItem("city");
  savedCitiesArray = JSON.parse(savedCities);
  savedCitiesArray.forEach((item) => {
    var createButton = document.createElement("button");
    createButton.classList.add(
      "btn",
      "btn-outline-primary",
      "btn-block",
      "my-2",
      "previous-button"
    );
    createButton.textContent = item;
    previousSearchDiv.appendChild(createButton);
  });
}
