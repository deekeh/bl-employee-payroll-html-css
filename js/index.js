// header
// document.querySelector('.search-toggle').addEventListener('click', function() {
//   this.parentElement.classList.toggle('off');
//   this.parentElement.classList.toggle('on');

//   this.parentElement.querySelector('.search').value = '';
// });

// table
const createTableRow = ({profile, name, gender, department, salary, startDate, id}) => {
  return `
    <tr>
      <td class="e-profile">
        <img src="../assets/Ellipse -${profile}.png" alt="User Profile" width="45">
      </td>
      <td class="e-name">
        ${name}
      </td>
      <td class="e-gender">
        ${gender}
      </td>
      <td class="e-department">
        ${department.map(d => (`<span class="department-pill">${d}</span>`)).join('')}
      </td>
      <td class="e-salary">
        &#8377; ${salary.toLocaleString()}
      </td>
      <td class="e-start-date">
        ${startDate}
      </td>
      <td class="e-actions">
        <button onclick="deleteEmployee(${id})" class="action-button" type="button">
          <span class="delete icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#658292" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </span>
        </button>
        <button onclick="editEmployee(${id})" class="action-button" type="button">
          <span class="delete icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#658292" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </span>
        </button>
        </action-button>
      </td>
    </tr>
  `;
}

const displayEmployeeCount = (n) => {document.getElementById("employee-number").innerHTML = n;};

const getEmployees = () => {
  let employeeJsonArray = [];
  // save all employees to employeJsonArray
  if (window.localStorage.getItem('empData')) {
    JSON.parse(window.localStorage.getItem('empData')).forEach(e => {
      employeeJsonArray.push({
        profile: e.eProfile,
        name: e.eName,
        gender: e.eGender,
        department: e.eDepartment,
        salary: e.eSalary,
        startDate: e.eStartDate,
        id: e.id,
      });
    });
    // display number of employees
    // displayEmployeeCount(JSON.parse(window.localStorage.getItem('empData')).length);
  }
  // else document.getElementById("employee-number").innerHTML = 0;
  return employeeJsonArray;
};

// display employees in table by creating new rows
const populateTable = (employeeJsonArray) => {
  document.querySelector("#e-table-body").innerHTML = '';
  employeeJsonArray.forEach(employeeJson => {
    document.querySelector("#e-table-body").innerHTML += createTableRow(employeeJson);
  });
}

// load employees on page load
window.onload = () => {
  const employees = getEmployees();
  displayEmployeeCount(employees.length);
  populateTable(employees);
}

// delete a particular employee using id
function deleteEmployee(id) {
  let employees = JSON.parse(window.localStorage.getItem('empData'));
  let newEmployees = employees.filter(e => e.id !== id); // return all objects except the object to be deleted
  // uncomment to log the new employee details array
  // console.log(newEmployees);
  window.localStorage.setItem('empData', JSON.stringify(newEmployees));
  populateTable(); // recreate the table
}

// redirecting to registration page with employee id in query string to edit particular employee details
function editEmployee(id) {
  window.location.href = "./employee-registration.html?edit="+id;
}
