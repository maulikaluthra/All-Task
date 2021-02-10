console.log("Hello! ");

const nav = document.querySelector(".nav");

console.log(nav);

window.onscroll = function () {
  var top = window.scrollY;
  console.log(top);
  if (top >= 145) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
};

