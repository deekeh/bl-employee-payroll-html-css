const submitRequest = (type, url, data = null, isAsync = true) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, `http://localhost:3000/${url}`, isAsync, data);
    if(['post', 'patch', 'put'].indexOf(type.toLowerCase()) !== -1) {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    }
    else {
      xhr.send();
    }

    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(this.status);
        }
      }
    };
  });
};

document.querySelector(".get").addEventListener("click", async function () {
  try {
    const data = await submitRequest("GET", "employees/");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

document.querySelector(".post-req").addEventListener("click", async function () {
  try {
    const empData = JSON.stringify({
      "name": "Someoneelse",
      "profile": "1",
      "gender": "female",
      "department": [
        "HR",
        "Finance",
        "Other"
      ],
      "salary": 23000,
      "startdate": "16 Aug 2021",
      "notes": "some note is given here"
    });
    const data = await submitRequest("POST", "employees/", empData);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
