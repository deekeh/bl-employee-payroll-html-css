import { submitRequest } from "./service/server-fetch.js";

let redirectUrl = "./";

const checkCredentials = (phone, password) => {
  return new Promise(async (resolve, reject) => {
    if (!phone) reject("phone_required");
    if (!password) reject("password_required");
    if (!/^[9][1][ ][6789][\d]{9}$/.test(phone)) reject("phone_format");

    try {
      const userDetails = await submitRequest(
        "GET",
        `credentials/?phone=${phone}&password=${password}`
      );
      if (userDetails.length !== 0) resolve(userDetails[0]);
      else reject("input_mismatch");
    } catch (err) {
      console.error(err);
    }
  });
};

document
  .querySelector(".login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    // console.log(e.target.password.value);

    document.querySelectorAll(".form-content>input").forEach((el) => {
      el.classList.remove("error");
    });

    try {
      const checkResult = await checkCredentials(
        e.target.phone.value,
        e.target.password.value
      );

      if (checkResult) {
        document.querySelectorAll(".form-content>input").forEach((el) => {
          el.classList.remove("error");
          document.querySelector(".login-container").classList.remove("emerge");
          document.querySelector(".login-container").classList.add("retract");
          window.localStorage.setItem("loginkey", JSON.stringify(checkResult));
          setTimeout(function () {
            window.location.href = redirectUrl;
          }, 700);
        });
      }
      // console.log(checkResult);
    } catch (err) {
      switch (err) {
        default:
          console.error(err);
        case "phone_required":
          document.querySelector(".form-content>.phone").classList.add("error");
          document.querySelector(".form-content>.phone-error").innerHTML =
            "Required";
          break;
        case "password_required":
          document
            .querySelector(".form-content>.password")
            .classList.add("error");
          document.querySelector(".form-content>.password-error").innerHTML =
            "Required";
          break;
        case "phone_format":
          document.querySelector(".form-content>.phone").classList.add("error");
          document.querySelector(".form-content>.phone-error").innerHTML =
            "Wrong Format [91 XXXXXXXXXX]";
          break;
        case "input_mismatch":
          document.querySelectorAll(".form-content").forEach((el) => {
            el.querySelector("input").classList.add("error");
            el.querySelector("small").innerHTML = "Invalid credentials";
          });
          break;
      }
    }
  });

// check if the user is already logged in on page load and redirect to home if so
window.onload = function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  redirectUrl = params.redirect || "./";
  console.log(redirectUrl);
  if (window.localStorage.getItem("loginkey"))
    window.location.href = redirectUrl;
};
