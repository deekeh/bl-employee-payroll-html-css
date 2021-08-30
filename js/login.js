const checkCredentials = (phone, password) => {
  return new Promise((resolve, reject) => {
    if (!phone) reject("phone_required");
    if (!password) reject("password_required");
    if (!/^[9][1][ ][6789][\d]{9}$/.test(phone)) reject ("phone_format")

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/credentials", true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        console.log(this.readyState);
        let credentials = JSON.parse(this.responseText);
        console.log(credentials);
        if (phone == credentials.phone && password == credentials.password)
          resolve(true);
        else reject("input_mismatch");
      }
    };
  });
};

document
  .querySelector(".login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log(e.target.password.value);

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
          setTimeout(function() {
            window.location.href = './';
          }, 700);
        });
      }
      console.log(checkResult);
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
