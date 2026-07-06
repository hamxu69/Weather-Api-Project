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
      this.classList.add("selected");
      searchInput.value = this.textContent;
      searchDrop.classList.add("hidden");
    });
  });
});

unitDrop.addEventListener("click", (e) => {
  e.stopPropagation();
  drop.classList.toggle("hidden");
});
// const tempList = document.querySelectorAll(".temp div");
// tempList.forEach((tempOption) => {
//   tempOption.addEventListener("click", function () {
//     tempList.forEach((el) => {
//       el.classList.remove("selected");
//     });
//     this.classList.add("selected");
//   });
// });
const groups = document.querySelectorAll(".drop-group");

groups.forEach((group) => {
  const items = group.querySelectorAll(".drop-item");

  items.forEach((item) => {
    item.addEventListener("click", function () {

      items.forEach((el) => {
        el.classList.remove("selected");
      });

      this.classList.add("selected");

    });
  });
});
