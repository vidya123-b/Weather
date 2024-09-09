const apiKey = "ea844b73c7baeda1a025dc3fd0c0dce6";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

function updateWeatherIcon(weatherCondition) {
  switch (weatherCondition) {
    case "Clouds":
      weatherIcon.src = "./weather-app-img/images/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "./weather-app-img/images/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "./weather-app-img/images/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "./weather-app-img/images/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "./weather-app-img/images/mist.png";
      break;
    // default:
    //   weatherIcon.src = "./weather-app-img/images/default.png";
  }
}

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    updateWeatherIcon(data.weather[0].main);

    errorElement.style.display = "none";
    weatherElement.style.display = "block";
  } catch (error) {
    console.error(error);
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    console.error("Please enter a city name");
  }
});
