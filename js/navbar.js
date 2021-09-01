(function () {
  let adminData = JSON.parse(window.localStorage.getItem("loginkey"));
  console.log(adminData);
  document.querySelector(".navbar .u-name-1").innerHTML =
    adminData.email.split("@")[0];
  document.querySelector(".navbar .u-name-2").innerHTML = adminData.email;
  document.querySelector(".u-phone").innerHTML = adminData.phone;
})();

document.querySelector(".user").addEventListener("click", function () {
  this.classList.toggle("on");
});
