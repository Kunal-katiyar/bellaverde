document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("mobile-menu");
  const navBar = document.querySelector(".mobile-navigation-bar");
  const img = document.querySelector(".icon");
  const name = document.querySelector(".web-name");
  // navBar.classList.add('invisible');
  menuToggle.addEventListener("click", function () {
    navBar.classList.toggle("active");
    if (navBar.classList.contains("animation-fade") || !navBar.classList.contains("active")) {
      navBar.classList.toggle("animation-fade");
    }
    if (navBar.classList.contains("animation-fade")) {
      setTimeout(function() {
        navBar.classList.toggle("animation-fade"), 300
      });
    }
    menuToggle.classList.toggle("active");
    name.classList.toggle("active");
  });
});