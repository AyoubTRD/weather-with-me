const form = document.querySelector("form");
const displayInfo = document.querySelector(".display-weather");
const error = document.querySelector(".error");
const conditionImage = document.querySelector(".condition-image");
const name = document.querySelector(".city-name");
const state = document.querySelector(".state");
const temp = document.querySelector(".temp");

form.addEventListener("submit", e => {
  e.preventDefault();
  getInfo(form.location.value)
    .then(info => {
      displayInfo.classList.remove("d-none");
      error.classList.remove("d-block");
      name.textContent = info.name;
      state.textContent = info.condition;
      temp.textContent = info.temp;
      console.log(info.isDay);
      if (info.isDay) {
        conditionImage.setAttribute("src", "img/day.svg");
      } else {
        conditionImage.setAttribute("src", "img/night.svg");
      }
    })
    .catch(err => {
      displayInfo.classList.add("d-none");
      error.classList.add("d-block");
      console.log(err);
    });
});
