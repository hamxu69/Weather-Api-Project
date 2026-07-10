const heroPanel = document.querySelector(".hero");
const button = document.querySelector(".day-btn");
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".day-dropdown");
const drop = document.querySelector(".dropdown");
const searchDrop = document.querySelector(".search-drop");
const grid = document.querySelector(".grid");
const feelsLikeElement = document.querySelector("#feelsLike");
const humidityElement = document.querySelector("#humid");
const windSpeedElement = document.querySelector("#wind");
const precipitationElement = document.querySelector("#precipitation");

// ✅ Cleaner version
function cityName() {
  const city = searchInput.value.trim() || "Lahore";
  getData(city);
  searchInput.value = "";
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

    // ✅ FIX: Parse the JSON before using geoData.
    const geoData = await geoResponse.json();

    // ✅ FIX: Prevent errors if no location is returned.
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found");
    }

    // NOTE:
    // This works for your use case, but feature_code would be a better check.
    if (geoData.results[0].name === geoData.results[0].country) {
      throw new Error("Please search for a city");
    }

    const { latitude, longitude } = geoData.results[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    // ✅ FIX: Removed unused variables.
    // const dailyUpdate = data.hourly;
    // const hourlyUpdate = data.daily;

    // ✅ FIX: Removed debug logs.
    // console.log(dailyUpdate);
    // console.log(hourlyUpdate);

    hello(data);
    renderHero(data, geoData);
  } catch (error) {
    console.error(error);
    grid.classList.add("unValid");
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
// console.log(getDay("2005-04-24"));
function hello(data) {
  const dailyWeather = document.querySelector(".scroll-row");
  let html = "";

  data.daily.time.forEach((el, index) => {
    // ✅ FIX: Removed debug log.
    // console.log(data.daily.time[index]);

    html += `
      <div class="day-card">
        <span class="day">${getDay(data.daily.time[index])}</span>

        <!-- ✅ FIX: Added quotes around src -->
        <img src="${getWeatherIcon(data.daily.weather_code[index])}" alt="Rain" class="day-img" />

        <div class="range">
          <span class="hi">${data.daily.temperature_2m_max[index]}</span>
          <span class="low">${data.daily.temperature_2m_min[index]}</span>
        </div>
      </div>
    `;
  });

  dailyWeather.innerHTML = html;
}
function renderHero(data, geo) {
  const { name, country } = geo.results[0];
  const {
    temperature_2m: temperature,
    precipitation,
    apparent_temperature: feelsLike,
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed,
    weather_code: weatherCode,
  } = data.current;

  precipitationElement.textContent = `${precipitation} mm`;
  feelsLikeElement.textContent = `${Math.round(feelsLike)}°`;
  humidityElement.textContent = `${humidity}%`;
  windSpeedElement.textContent = `${Math.round(windSpeed)} km/h`;
  const html = `
<div class="renderHero">
  <div class="hero-info">
    <h2 id="nameCity">${name}, ${country}</h2>
    <p id="date">${currentDate}</p>
  </div>

  <div class="hero-weather">
    <!-- ✅ FIX: Added quotes around src -->
    <img src="${getWeatherIcon(weatherCode)}" alt="Sunny" class="weather-img" />

    <span class="temp">
      <!-- ✅ Optional: Rounded the temperature -->
      <i class="heroTemp">${Math.round(temperature)}</i> °
    </span>
  </div>
</div>
`;
  heroPanel.innerHTML = html;
  grid.classList.remove("unValid");
}
