export const EmployeePayroll = class {
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
    } else throw new Error("#name");
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
    const dayDifference = (new Date() - new Date(ip)) / (60 * 60 * 24 * 1000);
    if (dayDifference < 0 || dayDifference >= 30) throw new Error(".startDate");
    else {
      document
        .querySelectorAll(".startDate")
        .forEach((el) => el.classList.remove("input-error"));
      this.eStartDate = ip;
    }
  }
  set notes(ip) {
    if (ip.length !== 0) {
      this.eNotes = ip;
      document.getElementById("notes").classList.remove("input-error");
    } else throw new Error("#notes");
  }
};
