document.querySelector(".logout").addEventListener("click", function () {
  window.localStorage.removeItem("loginkey");
  window.location.href = "./login.html";
});
