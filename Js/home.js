let weatherDiv = document.querySelector("#div-weather");
let searchBtn = document.querySelector("#search-btn");
let inputLocation = document.querySelector("#input-location");
const errorMessage = document.querySelector("#error-message");
const apiKey = "10d68c62f0934d65a67131343250107";




function getDayName(numberofDate) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(numberofDate);
    // const monthName = date.toLocaleString('default', { month: 'long' });
    return days[date.getDay()];
}

window.onload = function() {
    getWeatherData("Cairo");
};


function getWeatherData(cityName) {
    let city = cityName || inputLocation.value.trim();

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(err => {
            errorMessage.innerHTML = `<p class="alert alert-danger mt-3 w-50 mx-auto" role="alert">${err.message}</p>`;
        });
}


searchBtn.addEventListener("click", function() {
    getWeatherData();
});



function displayWeather(data) {
    const current = data.current;
    const today = data.forecast.forecastday[0];

    weatherDiv.innerHTML = `
    <div class="weather-card  col-lg-4">
      <div class="day-header d-flex justify-content-between align-items-between p-2   ">
        <span class="fw-light">${getDayName(today.date)}</span>
        <span class="fw-light" >${today.date}</span>
      </div>
      <div class="p-4">
      <h2>${data.location.name}</h2>
      <h1 class="display-1 fw-bolder text-white">${current.temp_c}ºC</h1>
      <img src="https:${current.condition.icon}" alt="">
      <p class="desc fw-light">${current.condition.text}</p>
      <div class="details d-flex gap-4 mt-3">
        <span class="d-flex align-items-center gap-2"> <img src="./images/imgi_3_icon-umberella.png" class="w-50 alt=""> ${current.humidity}%</span>
        <span class="d-flex align-items-center gap-2"><img src="./images/imgi_4_icon-wind.png" class="w-50 alt=""> ${current.wind_kph}km/h</span>
        <span class="d-flex align-items-center gap-2"><img src="./images/imgi_5_icon-compass.png"  class="w-50 alt=""> ${current.wind_dir}</span></div>
      </div>
    </div>
  `;

    for (let i = 1; i < 3; i++) {
        const day = data.forecast.forecastday[i];

        const bgcoloerMiddleCard = i === 1 ? "bg-Middle-Card" : "";

        const dayHeaderClass = bgcoloerMiddleCard ? "day-header special-bg" : "day-header";

        weatherDiv.innerHTML += `
      <div class="col-lg-4  ${bgcoloerMiddleCard}">
        <div class="day-header text-center p-2 ${dayHeaderClass}">
          <span class="fw-light">${getDayName(day.date)}</span>
        </div>
        <div class="p-4 text-center" >
         <img src="https:${day.day.condition.icon}" class="p-3" alt="">

         <h2 class=" text-white mt-3">${day.day.maxtemp_c}ºC</h2>

         <h4 class="fw-light fs-6">${day.day.mintemp_c}º</h4>

         <p class="desc fw-light">${day.day.condition.text}</p>
        </div>
 
      </div>
    `;
    }
}