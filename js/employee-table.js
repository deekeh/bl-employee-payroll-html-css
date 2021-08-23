const createTableRow = ({profile, name, gender, department, salary, startDate}) => {
  return `
    <tr>
      <td class="e-profile">
        <img src="../assets/Ellipse -${profile}.png" alt="User Profile">
      </td>
      <td class="e-name">
        ${name}
      </td>
      <td class="e-gender">
        ${gender}
      </td>
      <td class="e-department">
        ${department.join(', ')}
      </td>
      <td class="e-salary">
        &#8377; ${salary.toLocaleString()}
      </td>
      <td class="e-start-date">
        ${startDate}
      </td>
      <td class="e-actions">
        Delete, Edit
      </td>
    </tr>
  `;
}

const employeeJsonArray = [
  {
    profile: '1',
    name: 'Niraj',
    gender: 'Male',
    department: ['Sales', 'HR'],
    salary: 12000,
    startDate: '12 Aug 2021',
  },
  {
    profile: '3',
    name: 'Aditya',
    gender: 'Male',
    department: ['Sales'],
    salary: 14000,
    startDate: '18 Aug 2021',
  },
];

employeeJsonArray.forEach(employeeJson => {
  document.querySelector("#e-table-body").innerHTML += createTableRow(employeeJson);
});