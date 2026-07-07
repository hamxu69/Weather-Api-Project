const button = document.querySelector(".day-btn");
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".day-dropdown");
const drop = document.querySelector(".dropdown");
const searchDrop = document.querySelector(".search-drop");
function cityName() {
  if (searchInput.value.trim()) {
    const city = searchInput.value.trim();
    getData(city);
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
  console.log(items);
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
  const capitalResponse = await fetch(`https://countries.dev/name/${city}`);

  const capitalData = await capitalResponse.json();

  console.log(capitalData[0].capital); // Islamabad
  const required = capitalData[0].capital;
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${required}&count=1`,
  );
  const geoData = await geoResponse.json();
  const longitude = geoData.results[0].longitude;
  const latitude = geoData.results[0].latitude;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&current=temperature_2m`,
  );

  const data = await response.json();

  console.log(geoData);
  console.log(data);

  renderHero(data, geoData);
}

cityName();
// function display(apiData, geoData) {
// const currentTemperature = apiData.main.temp;
// const feelsLikeTemperature = apiData.main.feels_like;
// const humidityPercentage = apiData.main.humidity;
// const windSpeed = apiData.wind.speed;
// const countryName = geoData.address.country;
// const cityName = geoData.address.city;

// const heroTemperatureElement = document.querySelector(".heroTemp");
// const feelsLikeElement = document.querySelector("#feelsLike");
// const humidityElement = document.querySelector("#humid");
// const windSpeedElement = document.querySelector("#wind");
// const currentDateElement = document.querySelector("#date");
// const cityNameElement = document.querySelector("#nameCity");

// currentDateElement.textContent = currentDate;
// cityNameElement.textContent = cityName;
// heroTemperatureElement.textContent = Math.round(currentTemperature);
// feelsLikeElement.textContent = `${Math.round(feelsLikeTemperature)}°`;
// humidityElement.textContent = `${humidityPercentage}%`;
// windSpeedElement.textContent = `${Math.round(windSpeed * 3.6)} km/h`;
// }

function renderHero(data, geo) {
  console.log(geo.results[0].name);

  const heroPanel = document.querySelector(".hero");
  const nameCity = geo.results[0].name;
  const country = geo.results[0].country;
  const temperature = Math.round(data.current.temperature_2m);
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
}
