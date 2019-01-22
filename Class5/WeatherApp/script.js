// Global variables
let navbar = document.querySelector(".navbar");
let weatherIcon = document.getElementById("weatherIcon");
let statsDiv = document.getElementById("stats");
let hourlyDiv = document.getElementById("hourly");
let hourlyTable = document.getElementById("hourlyTable");
let statsNav = document.getElementById("statsNav");
let hourlyNav = document.getElementById("hourlyNav")
let message = document.getElementById("message");

// Functions
function getWeather(cityName) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("We got the weather!");
      message.innerText = "";
      let resultParsed = JSON.parse(xhr.response);
      console.log(resultParsed);
      generateHourlyTable(hourlyTable, resultParsed.list);
      showStats(statsDiv, resultParsed);
    } else {
      console.log("Problem getting the weather :(");
      console.log(JSON.parse(xhr.responseText).message);
      statsDiv.innerHTML = "";
      hourlyTable.innerHTML = "";
      message.innerText = JSON.parse(xhr.responseText).message;
    }
  };
  xhr.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=74e59f6374abe0d9b758877616ae444c`);
  xhr.send();
}

// GET STATS FUNCTIONS
function showStats(element, response){
  element.innerHTML = generateStats(getWeatherStats(response.list));
}
function generateStats(stats){
  return `
  <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 title">Temperature</div>
      <div class="col-md-6 col-sm-12 title">Humidity</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 stat"><b>Average:</b> ${stats.averageTemperature}&#8451;</div>
      <div class="col-md-6 col-sm-12 stat"><b>Average:</b> ${stats.averageHumidity}%</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 stat"><b>Highest:</b> ${stats.highestTemperature}&#8451;</div>
      <div class="col-md-6 col-sm-12 stat"><b>Highest:</b> ${stats.highestHumidity}%</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 stat"><b>Lowest:</b> ${stats.lowestTemperature}&#8451;</div>
      <div class="col-md-6 col-sm-12 stat"><b>Lowest:</b> ${stats.lowestHumidity}%</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12 title">Coldest Time</div>
      <div class="col-md-4 col-sm-12 title">Warmest Time</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 col-sm-12 stat">${stats.coldestTime.toLocaleString()}</div>
      <div class="col-md-4 col-sm-12 stat">${stats.warmestTime.toLocaleString()}</div>
    </div>
  `
}
function getWeatherStats(weatherList){
  console.log(weatherList);
  let averageTemp = weatherList
  .map(x => x.main.temp)
  .reduce((x,y) => x+=y, 0)
  /weatherList.length;
  let lowestTemp = weatherList
  .map(x => x.main.temp_min)
  .reduce((x, y) => x = y < x ? y : x, Infinity);
  let highestTemp = weatherList
  .map(x => x.main.temp_max)
  .reduce((x, y) => x = y > x ? y : x, -Infinity);
  let averageHumidity = weatherList
  .map(x => x.main.humidity)
  .reduce((x,y) => x+=y, 0)
  /weatherList.length;
  let lowestHumidity = weatherList
  .map(x => x.main.humidity)
  .reduce((x, y) => x = y < x ? y : x, Infinity);
  let highestHumidity = weatherList
  .map(x => x.main.humidity)
  .reduce((x, y) => x = y > x ? y : x, -Infinity);
  let coldestTime = weatherList
  .reduce((x, y) => x = y.main.temp < x.main.temp ? y : x, weatherList[0]).dt_txt;
  coldestTime = new Date(coldestTime);
  let warmestTime = weatherList
  .reduce((x, y) => x = y.main.temp > x.main.temp ? y : x, weatherList[0]).dt_txt;
  warmestTime = new Date(warmestTime);
  return {
    averageTemperature: Math.round(averageTemp),
    lowestTemperature: Math.round(lowestTemp),
    highestTemperature: Math.round(highestTemp),
    averageHumidity: averageHumidity,
    lowestHumidity: lowestHumidity,
    highestHumidity: highestHumidity,
    coldestTime: coldestTime,
    warmestTime: warmestTime
  }
}

// GET HOURLY FUNCTIONS
function generateHourlyTable(element, weatherList){
  element.innerHTML = `<li class="list-group-item">
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-2"><b>Weather</b></div>
    <div class="col-md-2"><b>Time</b></div>
    <div class="col-md-2"><b>Temperature</b></div>
    <div class="col-md-2"><b>Humidity</b></div>
    <div class="col-md-2"><b>Wind Speed</b></div>
  </div>
</li>`;
  weatherList.forEach(weather => {
    element.innerHTML += generateHourlyRow(weather);
  });
}
function generateHourlyRow(weather){
  return `<li class="list-group-item">
  <div class="row">
      <div class="col-md-2">${getWeatherIcon(weather.weather[0].icon)}</div>
      <div class="col-md-2">${weather.weather[0].description}</div>
      <div class="col-md-2">${new Date(weather.dt_txt).toLocaleString()}</div>
      <div class="col-md-2">${Math.round(weather.main.temp)}&#8451;</div>
      <div class="col-md-2">${weather.main.humidity}%</div>
      <div class="col-md-2">${weather.wind.speed} m/s</div>
  </div>
</li>`;
}
function getWeatherIcon(iconId){
  return `<img src="http://openweathermap.org/img/w/${iconId}.png">`;
}

// Event Handlers
navbar.querySelector(".btn").addEventListener("click", ()=>{
  console.log("hey");
  let cityName = navbar.querySelector("input").value;
  getWeather(cityName);
})
statsNav.addEventListener("click", ()=>{
  statsNav.parentElement.classList.add("active");
  hourlyNav.parentElement.classList.remove("active");
  statsDiv.style.display = "block";
  hourlyDiv.style.display = "none";
});
hourlyNav.addEventListener("click", ()=>{
  statsNav.parentElement.classList.remove("active");
  hourlyNav.parentElement.classList.add("active");
  statsDiv.style.display = "none";
  hourlyDiv.style.display = "block";
});