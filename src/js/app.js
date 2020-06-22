console.log("hello from app.js!!");

//navBar

var navbar = document.getElementById("stickyNav");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
  console.log("scroll", window.pageYOffset, sticky);
}

window.onscroll = function () {
  myFunction();
};
