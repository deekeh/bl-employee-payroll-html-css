// empty employee object on page-load
// const employees = new Array();

const EmployeePayroll = class {
  // getters
  get name() {
    return this.eName;
  }
  get profile() {
    return this.eProfile;
  }
  get gender() {
    return this.eGender;
  }
  get department() {
    return this.eDepartment;
  }
  get salary() {
    return this.eSalary;
  }
  get startDate() {
    return this.eStartDate;
  }
  get notes() {
    return this.eNotes;
  }
  
  // setters
  set name(ip) {
    if (/^[A-Z][a-zA-Z]{2,}$/.test(ip)) {
      this.eName = ip;
      document.getElementById("name").classList.remove("input-error");
    }
    else throw new Error("#name");
  }
  set profile(ip) {
    this.eProfile = ip;
  }
  set gender(ip) {
    this.eGender = ip;
  }
  set department(ip) {
    this.eDepartment = ip;
  }
  set salary(ip) {
    this.eSalary = ip;
  }
  set startDate(ip) {
    // const ipDate = new Date(ip);
    // const timeElapsed = Date.now();
    // let daysDifference = (timeElapsed - ipDate) / (1000 * 60 * 60 * 24);
  
    // if (daysDifference <= 30) {
    //   throw new Error(".startDate");
    // } else {
    //   document.querySelectorAll(".startDate").forEach(el => {
    //     el.classList.remove("input-error");
    //   });
      this.eStartDate = ip;
    // }
  }
  set notes(ip) {
    if (ip.length !== 0) {
      this.eNotes = ip;
      document.getElementById("notes").classList.remove("input-error");
    }
    else throw new Error("#notes");
  }
}
const emp = new EmployeePayroll();

// listen to form submit event
document.getElementById("reg-form").onsubmit = function(e) {
  e.preventDefault();
  const {
    name: {
      value: name
    },
    'profile-image' : {
      value: profileImage
    },
    gender: {
      value: gender
    },
    department: eDepartment,
    salary: {
      value: salary
    },
    day: {
      value: date
    },
    month: {
      value: month
    },
    year: {
      value: year
    },
    notes: {
      value: notes
    }
  } = e.target;
  const department = [];
  eDepartment.forEach(d => {
    if(d.checked) department.push(d.value);
  });

  try {
    emp.name = name;
    emp.profile = profileImage;
    emp.gender = gender;
    emp.department = department;
    emp.salary = salary;
    emp.startDate = `${date} ${month} ${year}`;
    emp.notes = notes;

    // saving employee to localstorage
    if (window.localStorage.getItem('empData')) {
      let storedEmployees = [];
      storedEmployees = [...JSON.parse(window.localStorage.getItem('empData')), emp];
      window.localStorage.setItem('empData', [JSON.stringify(storedEmployees)]);
      console.log(JSON.parse(window.localStorage.getItem('empData')));
    }
    else {
      window.localStorage.setItem('empData', JSON.stringify([emp]));
      console.log(window.localStorage.getItem('empData'));
    }
    window.location.href = './';
  }
  catch (err) {
    console.error(err.message);
    document.querySelectorAll(err.message).forEach(el => {
      el.classList.add("input-error");
    });
  }
  // finally {
  //   console.log(employees);
  // }
}

// listening to key-presses and checking input on change
document.getElementById("name").onkeyup = function(e) {
  try {
    emp.name = e.target.value;
  }
  catch (err) {
    document.querySelector(err.message).classList.add("input-error");
  }
};
document.getElementById("notes").onkeyup = function(e) {
  try {
    emp.notes = e.target.value;
  }
  catch (err) {
    document.querySelector(err.message).classList.add("input-error");
  }
};