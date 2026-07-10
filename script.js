const dailyWeather = document.querySelector(".scroll-row");
const button = document.querySelector(".day-btn");
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".day-dropdown");
const drop = document.querySelector(".dropdown");
const stats = document.querySelector(".stats");
const grid = document.querySelector(".grid");
const selectedDay = document.querySelector(".selected-day");
const unitDrop = document.querySelector(".units-btn");
const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

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
  dropdown.classList.add("hidden");
});
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
async function getData(name) {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1`,
    );

    if (!geoResponse.ok) {
      throw new Error("Wrong city name");
    }

    const city = await geoResponse.json();

    if (city.results[0].name === city.results[0].country) {
      throw new Error("it's a country");
    }

    const { latitude, longitude } = city.results[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    const hourlyUpdate = data.hourly;
    const dailyUpdate = data.daily;
    const currentUpdate = data.current;

    cardsRender(dailyUpdate);
    renderHero(currentUpdate, city);
  } catch (error) {
    console.error(error);
    grid.classList.add("unValid");
  }
}

function cardsRender(data) {
  let html = "";
  const {
    time: time,
    weather_code: weatherCode,
    temperature_2m_min: tempMin,
    temperature_2m_max: tempMax,
  } = data;
  time.forEach((el, index) => {
    html += `            
                <div class="day-card">
                  <span class="day">${getDay(time[index])}</span>
                  <img src=${getWeatherIcon(weatherCode[index])} alt="Rain" class="day-img" />
                  <div class="range">
                    <span class="hi">${Math.round(tempMax[index])}</span><span class="low">${Math.round(tempMin[index])}</span>
                  </div>
                </div>
                  `;
  });
  dailyWeather.innerHTML = html;
}

function renderHero(dailyUpdate, geo) {
  const heroPanel = document.querySelector(".hero");
  const { name, country } = geo.results[0];
  const {
    temperature_2m: temperature,
    precipitation,
    apparent_temperature: feelsLike,
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed,
    weather_code: weatherCode,
  } = dailyUpdate;

  const html = `
    <div class="renderHero">
      <div class="hero-info">
        <h2 id="nameCity">${name}, ${country}</h2>
        <p id="date">${currentDate}</p>
      </div>
      <div class="hero-weather">
        <img src=${getWeatherIcon(weatherCode)} alt="Sunny" class="weather-img" />
        <span class="temp">
          <i class="heroTemp">${Math.round(temperature)}</i> °
        </span>
      </div>
    </div>
  `;
  const htmlOne = `
              <div class="card">
              <span class="label">Feels Like</span>
              <span class="value" id="feelsLike">${Math.round(feelsLike)}°</span>
            </div>
            <div class="card">
              <span class="label" >Humidity</span>
              <span class="value" id="humid">${humidity}%</span>
            </div>
            <div class="card">
              <span class="label">Wind</span>
              <span class="value" id="wind">${windSpeed} km/h</span>
            </div>
            <div class="card">
              <span class="label">Precipitation</span>
              <span class="value" id="precipitation">${precipitation} mm</span>
            </div>
  `;
  stats.innerHTML = htmlOne;
  heroPanel.innerHTML = html;
  grid.classList.remove("unValid");
}
cityName();
