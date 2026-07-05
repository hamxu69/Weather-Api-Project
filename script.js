const button = document.getElementByClassName("day-btn");
console.log(button);
button.addEventListener("click", function (e) {
  console.log("clicked");
  
});
button.classlist.remove(".day-btn");
