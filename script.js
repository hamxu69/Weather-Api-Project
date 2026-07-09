const button = document.querySelector(".day-btn");
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".day-dropdown");
const drop = document.querySelector(".dropdown");
const searchDrop = document.querySelector(".search-drop");
const grid = document.querySelector(".grid");
function cityName() {
  if (searchInput.value.trim()) {
    const city = searchInput.value.trim();
    getData(city);
    searchInput.value = "";
  } else {
    getData("Lahore");
  }
}
document.querySelector(".search-btn").addEventListener("click", cityName);
const selectedDay = document.querySelector(".selected-day");
const unitDrop = document.querySelector(".units-btn");
// console.log(button, dropdown);
const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});
button.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("hidden");
});
const days = document.querySelectorAll(".day-item");
days.forEach((day) => {
  day.addEventListener("click", function () {
    days.forEach((el) => {
      el.classList.remove("selected");
    });
    this.classList.add("selected");
    selectedDay.textContent = this.textContent;
    dropdown.classList.add("hidden");
  });
});

const cities = document.querySelectorAll(".search-item");
cities.forEach((city) => {
  city.addEventListener("click", function () {
    cities.forEach((el) => {
      searchInput.value = this.textContent;
      searchDrop.classList.add("hidden");
    });
    this.classList.add("selected");
  });
});

unitDrop.addEventListener("click", (e) => {
  e.stopPropagation();
  drop.classList.toggle("hidden");
});
const groups = document.querySelectorAll(".drop-group");
groups.forEach((group) => {
  const items = group.querySelectorAll(".drop-item");
  // console.log(items);
  items.forEach((option) => {
    option.addEventListener("click", function () {
      console.log(option);

      items.forEach((el) => {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });
});
document.addEventListener("click", () => {
  drop.classList.add("hidden");
  searchDrop.classList.add("hidden");
  dropdown.classList.add("hidden");
});

async function getData(city) {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
    );

    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location.");
    }

    const geoData = await geoResponse.json();
    // console.log(geoData.results[0]);

    if (geoData.results[0].name === geoData.results[0].country) {
      throw new Error("Location not found");
    }

    const { latitude, longitude } = geoData.results[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const hourlyData = data.hourly;
    const dailyData = data.daily;
    const nameData = geoData.results[0];

    console.log(hourlyData);
    console.log(dailyData);
    console.log(nameData);

    renderDaily(dailyData, hourlyData);
    renderHero(data, geoData);
  } catch (error) {
    console.error(error);
    grid.classList.add("unvalid");
  }
}
cityName();
function getWeatherIcon(weatherCode) {
  if (weatherCode === 0) {
    return "images/icon-sunny.webp";
  }
  if (weatherCode === 1 || weatherCode === 2) {
    return "images/icon-partly-cloudy.webp";
  }
  if (weatherCode === 3) {
    return "images/icon-overcast.webp";
  }
  if (weatherCode === 45 || weatherCode === 48) {
    return "images/icon-fog.webp";
  }
  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "images/icon-drizzle.webp";
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "images/icon-rain.webp";
  }
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "images/icon-snow.webp";
  }
  if ([95, 96, 99].includes(weatherCode)) {
    return "images/icon-storm.webp";
  }
  return "images/icon-search.svg";
}
function getDay(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
  });
}
console.log(getDay("2005-04-24"));
function renderDaily(hourlyData, dailyData) {
  const dailyWeather = document.querySelector(".scroll-row");
  let html = "";
  dailyData.time.forEach((el, index) => {
    console.log(dailyData.time[index]);

    html += `            
                <div class="day-card">
                  <span class="day">${getDay(data.daily.time[index])}</span>
                  <img src=${getWeatherIcon(data.daily.weather_code[index])} alt="Rain" class="day-img" />
                  <div class="range">
                    <span class="hi">${data.daily.temperature_2m_max[index]}</span><span class="low">${data.daily.temperature_2m_min[index]}</span>
                  </div>
                  </div>
                  `;
  });
  dailyWeather.innerHTML = html;
  console.log(data.daily.temperature_2m_max[0]);
}

function renderHero(data, geo) {
  const heroPanel = document.querySelector(".hero");
  const nameCity = geo.results[0].name;
  const country = geo.results[0].country;
  const temperature = Math.round(data.current.temperature_2m);
  const precipitation = data.current.precipitation;
  const feelsLikeTemperature = data.current.apparent_temperature;
  const humidityPercentage = data.current.relative_humidity_2m;
  const windSpeed = data.current.wind_speed_10m;

  const feelsLikeElement = document.querySelector("#feelsLike");
  const humidityElement = document.querySelector("#humid");
  const windSpeedElement = document.querySelector("#wind");
  const precipitationElement = document.querySelector("#precipitation");

  precipitationElement.textContent = `${precipitation} mm`;
  feelsLikeElement.textContent = `${Math.round(feelsLikeTemperature)}°`;
  humidityElement.textContent = `${humidityPercentage}%`;
  windSpeedElement.textContent = `${Math.round(windSpeed)} km/h`;
  const html = `
    <div class="renderHero">
      <div class="hero-info">
        <h2 id="nameCity">${nameCity}, ${country}</h2>
        <p id="date">${currentDate}</p>
      </div>
      <div class="hero-weather">
        <img src="images/icon-sunny.webp" alt="Sunny" class="weather-img" />
        <span class="temp">
          <i class="heroTemp">${temperature}</i> °
        </span>
      </div>
    </div>
  `;
  heroPanel.innerHTML = html;
  grid.classList.remove("unvalid");
}
