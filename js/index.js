const salarySlider = document.getElementById("salary");

salarySlider.onchange = function() {
  document.getElementById("salary-text").innerHTML = salarySlider.value;
}

const EmployeePayroll = class {
  // constructor(eName, eProfile, eGender, eDepartment, eSalary, eStartDate, eNotes) {
  //   this.eName = eName;
  //   this.eProfile = eProfile;
  //   this.eGender = eGender;
  //   this.eDepartment = eDepartment;
  //   this.eSalary = eSalary;
  //   this.eStartDate = eStartDate;
  //   this.eNotes = eNotes;
  // }

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
    if (/^[a-zA-Z]{8,}$/.test(ip)) {
      this.eName = ip;
      document.getElementById("name").classList.remove("input-error");
    }
    else throw new Error("name");
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
    this.eStartDate = ip;
  }
  set notes(ip) {
    if (ip.length !== 0) {
      this.eNotes = ip;
      document.getElementById("notes").classList.remove("input-error");
    }
    else throw new Error("notes");
  }
}
const emp = new EmployeePayroll();

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

  console.log();

  // const emp = new EmployeePayroll(name, profileImage, gender, department, salary, `${date} ${month} ${year}`, notes);
  try {
    emp.name = name;
    emp.profile = profileImage;
    emp.gender = gender;
    emp.department = department;
    emp.salary = salary;
    emp.startDate = `${date} ${month} ${year}`;
    emp.notes = notes;
  }
  catch (err) {
    document.getElementById(err.message).classList.add("input-error");
  }
}

// checking input on change
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
