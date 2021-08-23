// empty employee object on page-load
const employees = new Array();

const EmployeePayroll = class {
  // getters
  get name() {
    return this.name;
  }
  get profile() {
    return this.profile;
  }
  get gender() {
    return this.gender;
  }
  get department() {
    return this.department;
  }
  get salary() {
    return this.salary;
  }
  get startDate() {
    return this.startDate;
  }
  get notes() {
    return this.notes;
  }
  
  // setters
  set name(ip) {
    if (/^[A-Z][a-zA-Z]{2,}$/.test(ip)) {
      this.name = ip;
      document.getElementById("name").classList.remove("input-error");
    }
    else throw new Error("name");
  }
  set profile(ip) {
    this.profile = ip;
  }
  set gender(ip) {
    this.gender = ip;
  }
  set department(ip) {
    this.department = ip;
  }
  set salary(ip) {
    this.salary = ip;
  }
  set startDate(ip) {
    this.startDate = ip;
  }
  set notes(ip) {
    if (ip.length !== 0) {
      this.notes = ip;
      document.getElementById("notes").classList.remove("input-error");
    }
    else throw new Error("notes");
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
    employees.push({id: employees.length, employee: emp});
  }
  catch (err) {
    document.getElementById(err.message).classList.add("input-error");
  }
  finally {
    console.log(employees);
  }
}

// listening to key-presses and checking input on change
document.getElementById("name").onkeyup = function(e) {
  try {
    emp.name = e.target.value;
  }
  catch (err) {
    document.getElementById(err.message).classList.add("input-error");
  }
};
document.getElementById("notes").onkeyup = function(e) {
  try {
    emp.notes = e.target.value;
  }
  catch (err) {
    document.getElementById(err.message).classList.add("input-error");
  }
};