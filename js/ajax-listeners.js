import { submitRequest } from "./service/server-fetch.js";

document.querySelector(".get").addEventListener("click", async function () {
  try {
    const data = await submitRequest("GET", "employees/");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

document
  .querySelector(".post-req")
  .addEventListener("click", async function () {
    try {
      const empData = JSON.stringify({
        name: "Someoneelse",
        profile: "1",
        gender: "female",
        department: ["HR", "Finance", "Other"],
        salary: 23000,
        startdate: "16 Aug 2021",
        notes: "some note is given here",
      });
      const data = await submitRequest("POST", "employees/", empData);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  });

document.querySelector(".put-req").addEventListener("click", async function () {
  try {
    const empData = JSON.stringify({
      name: "Someother",
      profile: "3",
      gender: "female",
      department: ["HR", "Finance", "Other"],
      salary: 25000,
      startdate: "16 Aug 2021",
      notes: "some note is given here",
    });
    const data = await submitRequest("PUT", "employees/1", empData);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

document
  .querySelector(".delete-req")
  .addEventListener("click", async function () {
    try {
      const data = await submitRequest("DELETE", "employees/1");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  });
