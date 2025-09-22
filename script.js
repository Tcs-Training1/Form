const form = document.getElementById("empForm");
const tableBody = document.querySelector("#empTable tbody");
const jsonOutput = document.getElementById("jsonOutput");

// JSON array to hold employees (in memory)
let employees = [];
let editIndex = -1;

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Build JSON object
  const employee = {
    EmpId: document.getElementById("EmpId").value,
    EmpName: document.getElementById("EmpName").value,
    Address: document.getElementById("Address").value,
    empType: document.querySelector('input[name="empType"]:checked').value,
    office: document.getElementById("office").value,
    dob: document.getElementById("dob").value
  };

  if (editIndex === -1) {
    employees.push(employee); // Add new
  } else {
    employees[editIndex] = employee; // Update existing
    editIndex = -1;
  }

  renderTable();
  form.reset();
});

// Render JSON array into table + JSON preview
function renderTable() {
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = tableBody.insertRow();

    row.insertCell(0).innerText = emp.empId;
    row.insertCell(1).innerText = emp.empName;
    row.insertCell(2).innerText = emp.address;
    row.insertCell(3).innerText = emp.empType;
    row.insertCell(4).innerText = emp.office;
    row.insertCell(5).innerText = emp.dob;

    const actionsCell = row.insertCell(6);
    actionsCell.classList.add("actions");
    actionsCell.innerHTML = `
      <button onclick="editRow(${index})">Edit</button>
      <button onclick="deleteRow(${index})">Delete</button>
    `;
  });

  jsonOutput.textContent = JSON.stringify(employees, null, 2);
}

// Edit row data
function editRow(index) {
  const emp = employees[index];
  document.getElementById("EmpId").value = emp.empId;
  document.getElementById("EmpName").value = emp.empName;
  document.getElementById("Address").value = emp.address;
  document.querySelector('input[name="empType"][value="' + emp.empType + '"]').checked = true;
  document.getElementById("office").value = emp.office;
  document.getElementById("dob").value = emp.dob;

  editIndex = index;
}

// Delete row data
function deleteRow(index) {
  employees.splice(index, 1);
  renderTable();
}