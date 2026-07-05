// =========================
// Elements
// =========================

// Units Dropdown
const unitsBtn = document.querySelector(".units-btn");
const unitsDropdown = document.querySelector(".dropdown");

// Day Dropdown
const dayBtn = document.querySelector(".day-btn");
const dayDropdown = document.querySelector(".day-dropdown");
const selectedDay = document.querySelector(".selected-day");

// Search Dropdown
const searchInput = document.querySelector(".search-input");
const searchDropdown = document.querySelector(".search-drop");
const searchItems = document.querySelectorAll(".search-item");
const inputWrap = document.querySelector(".input-wrap");

// =========================
// Units Dropdown
// =========================

unitsBtn.addEventListener("click", function(e) {
    e.stopPropagation();

    unitsDropdown.classList.toggle("hidden");
    dayDropdown.classList.add("hidden");
    searchDropdown.classList.add("hidden");
});

// =========================
// Day Dropdown
// =========================

dayBtn.addEventListener("click", function(e) {
    e.stopPropagation();

    dayDropdown.classList.toggle("hidden");
    unitsDropdown.classList.add("hidden");
    searchDropdown.classList.add("hidden");
});

document.querySelectorAll(".day-item").forEach(function(item){

    item.addEventListener("click", function(){

        document.querySelectorAll(".day-item").forEach(function(i){
            i.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedDay.textContent = this.textContent;

        dayDropdown.classList.add("hidden");

    });

});

// =========================
// Search Dropdown
// =========================

inputWrap.addEventListener("click", function(e){

    e.stopPropagation();

    searchDropdown.classList.remove("hidden");

    unitsDropdown.classList.add("hidden");
    dayDropdown.classList.add("hidden");

});

searchInput.addEventListener("input", function(){

    searchDropdown.classList.remove("hidden");

});

searchItems.forEach(function(item){

    item.addEventListener("click", function(e){

        e.stopPropagation();

        searchInput.value = this.textContent;

        searchDropdown.classList.add("hidden");

    });

});

// =========================
// Close Everything
// =========================

document.addEventListener("click", function(){

    unitsDropdown.classList.add("hidden");
    dayDropdown.classList.add("hidden");
    searchDropdown.classList.add("hidden");

});