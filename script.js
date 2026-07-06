const button = document.querySelector(".day-btn");
const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".day-dropdown");
const drop = document.querySelector(".dropdown");
const searchDrop = document.querySelector(".search-drop");
const selectedDay = document.querySelector(".selected-day");
const unitDrop = document.querySelector(".units-btn");
// console.log(button, dropdown);

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

searchInput.addEventListener("click", (e) => {
  e.stopPropagation();
  searchDrop.classList.remove("hidden");
  console.log(searchDrop);
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
async function getData() {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=185e4b8f7e84417023d9c592ac1b4cc3&units=metric",
    );
    if (!response.ok) {
      throw new Error("Fetching failed");
    }
    const data = await response.json();
    display(data) 
    
  } catch (error) {
    console.error(error);
  }
}
const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

getData();
function display(apiData) {
  console.log(apiData);
  
  const heroTemp = apiData.main.temp
  const feelsLike = apiData.main.feels_like
  const humidity = apiData.main.humidity
  const windy = apiData.wind.speed
  const name = apiData.name

  console.log(heroTemp);
  const hero = document.querySelector('.heroTemp')
  const feels = document.querySelector('#feelsLike')
  const humidityData = document.querySelector('#humid')
  const wind = document.querySelector('#wind')
  const date = document.querySelector('#date')
  const cityName = document.querySelector('#nameCity')
  date.textContent = currentDate
  cityName.textContent = name
  hero.textContent = Math.round(heroTemp)
  feels.textContent = `${Math.round(feelsLike)}°`
  wind.textContent = `${Math.round(windy)}km/h`
}