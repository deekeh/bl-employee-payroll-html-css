import { submitRequest } from "./service/server-fetch.js";

let redirectUrl = "./";

const checkInputs = async (email, phone, password) => {
  return new Promise(async (resolve, reject) => {
    // empty value check
    if (!email) reject("email_required");
    else if (!phone) reject("phone_required");
    else if (!password) reject("password_required");
    // regex check
    else if (
      !/^([a-zA-Z0-9]+([.][a-zA-Z0-9]+)*)[@]([a-zA-Z0-9]+([.][a-zA-Z]{2,})+)$/.test(
        email
      )
    )
      reject("email_format");
    else if (!/^[9][1][ ][6789][\d]{9}$/.test(phone)) reject("phone_format");
    else
      try {
        const searchedEmployee = await submitRequest(
          "GET",
          `credentials?phone=${phone}`
        );
        if (searchedEmployee.length !== 0) reject("existing_phone");
        else {
          await submitRequest(
            "POST",
            "credentials/",
            JSON.stringify({ email, phone, password })
          );
          resolve(true);
        }
      } catch (err) {
        console.error(err);
        reject(err);
      }
  });
};

document
  .querySelector(".login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = e.target.email.value,
      phone = e.target.phone.value,
      password = e.target.password.value;
    document
      .querySelectorAll(".form-content>input")
      .forEach((el) => el.classList.remove("error"));

    try {
      const checkUser = await checkInputs(email, phone, password);
      if (checkUser) window.location.href = "./login.html";
    } catch (err) {
      switch (err) {
        case "email_required":
          document.querySelector(".form-content>.email").classList.add("error");
          document.querySelector(".form-content>.email-error").innerHTML =
            "Required";
          break;

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
        case "email_format":
          document.querySelector(".form-content>.email").classList.add("error");
          document.querySelector(".form-content>.email-error").innerHTML =
            "Invalid format [name@example.com]";
          break;
        case "phone_format":
          document.querySelector(".form-content>.phone").classList.add("error");
          document.querySelector(".form-content>.phone-error").innerHTML =
            "Invalid format [91 XXXXXXXXXX]";
          break;
        case "existing_phone":
          document.querySelector(".form-content>.phone").classList.add("error");
          document.querySelector(".form-content>.phone-error").innerHTML =
            "Phone already registered";
          break;
        default:
          console.error(err);
          break;
      }
    }
  });

window.onload = function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  redirectUrl = params.redirect ? decodeURI(params.redirect) : "./";
  // console.log(redirectUrl);
  if (window.localStorage.getItem("loginkey"))
    window.location.href = redirectUrl;
};
