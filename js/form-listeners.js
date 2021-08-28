import { EmployeePayroll } from "./Employee.js";
import { submitRequest } from "./service/server-fetch.js";

// setting global variable EDIT to false to make the form behave as new-registration form by default
let EDIT = false;

const salarySlider = document.getElementById("salary");

salarySlider.onchange = function () {
  document.getElementById("salary-text").innerHTML = salarySlider.value;
};

const emp = new EmployeePayroll();

// listen to form submit event
document.getElementById("reg-form").onsubmit = async function (e) {
  e.preventDefault();
  const {
    name: { value: name },
    "profile-image": { value: profileImage },
    gender: { value: gender },
    department: eDepartment,
    salary: { value: salary },
    day: { value: date },
    month: { value: month },
    year: { value: year },
    notes: { value: notes },
  } = e.target;
  const department = [];
  eDepartment.forEach((d) => {
    if (d.checked) department.push(d.value);
  });

  try {
    // try to save employee details to emp object
    emp.name = name;
    emp.profile = profileImage;
    emp.gender = gender;
    emp.department = department;
    emp.salary = salary;
    emp.startDate = `${date} ${month} ${year}`;
    emp.notes = notes;

    if (EDIT === false) {
      // saving employee to database
      await submitRequest("POST", "employees", JSON.stringify(emp));
    } else {
      await submitRequest("PUT", `employees/${EDIT}`, JSON.stringify(emp));
    }
    window.location.href = "./";
  } catch (err) {
    // uncomment to log error
    // console.error(err);

    if (err.status) console.error(err);
    else {
      // handle error by giving red border to erroneous input field
      document.querySelectorAll(err.message).forEach((el) => {
        el.classList.add("input-error");
      });
    }
  }
};

// listening to key-presses and checking input on change
document.getElementById("name").onkeyup = function (e) {
  try {
    emp.name = e.target.value;
  } catch (err) {
    document.querySelector(err.message).classList.add("input-error");
  }
};
document.getElementById("notes").onkeyup = function (e) {
  try {
    emp.notes = e.target.value;
  } catch (err) {
    document.querySelector(err.message).classList.add("input-error");
  }
};

// set edit data to form if available
window.onload = async function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params.edit) {
    try {
      let empData = await submitRequest("GET", `employees/${params.edit}`);
      EDIT = empData !== undefined ? params.edit : false;

      // uncomment to log the value of global variable EDIT
      // console.log("Edit:", EDIT);

      if (empData) {
        document.getElementById("name").value = empData.eName; //set given name

        // set saved profile image
        document
          .querySelectorAll("input[name='profile-image']")
          .forEach((n) => {
            if (n.value == empData.eProfile) n.checked = true;
          });

        // set saved gender
        document.querySelectorAll("input[name='gender']").forEach((n) => {
          if (n.value == empData.eGender) n.checked = true;
        });

        // set saved departments
        document.querySelectorAll("input[name='department']").forEach((n) => {
          if (empData.eDepartment.indexOf(n.value) !== -1) n.checked = true;
        });

        // set saved salary
        document.getElementById("salary").value = empData.eSalary;
        document.getElementById("salary-text").innerHTML = empData.eSalary;

        // set saved start-date
        document.getElementById("year").value =
          empData.eStartDate.split(" ")[2];
        document.getElementById("month").value =
          empData.eStartDate.split(" ")[1];
        document.getElementById("day").value = empData.eStartDate.split(" ")[0];

        // set saved notes
        document.getElementById("notes").value = empData.eNotes;
      }
    } catch (err) {
      console.error(err);
    }
  }
};

// remove red error borders from input fields on form reset
document.getElementById("reg-form").onreset = function () {
  document.getElementById("name").className = "name";
  document
    .querySelectorAll(".startDate")
    .forEach((el) => el.classList.remove("input-error"));
  document.getElementById("notes").classList.remove("input-error");
};
