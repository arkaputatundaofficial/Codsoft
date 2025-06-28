const toggleBtn = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

var carousel = document.querySelector(".carousel");
var seats = Array.from(document.querySelectorAll(".carousel-seat"));

function next(el) {
  let index = seats.indexOf(el);
  return index < seats.length - 1 ? seats[index + 1] : seats[0];
}

function progress() {
  var el = document.querySelector(".is-ref");
  el.classList.remove("is-ref");
  var newSeat = next(el);

  newSeat.classList.add("is-ref");
  newSeat.style.order = 1;

  let order = 2;
  let tempSeat = newSeat;
  for (let i = 1; i < seats.length; i++) {
    tempSeat = next(tempSeat);
    tempSeat.style.order = order++;
  }

  carousel.classList.remove("is-set");
  setTimeout(() => carousel.classList.add("is-set"), 50);
}

setInterval(progress, 2000);
