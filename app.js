// Global variables
let students = [];
const root = document.querySelector(".student-table");

// Fetch data
fetch("./students-list.json")
  .then(res => res.json())
  .then(data => data.students)
  .then(displayStudents)
  .catch(err => console.log(err))

// Display Data
function displayStudents(data) {
  students = data;
  let tableHTML = '';
  students.forEach(student => {
    tableHTML +=
      `
        <tr>
                <td>${student.name}</td>
                <td>${student.email}</td> 
                <td>${student.grade}</td>
                <td>${student.id}</td>
        </tr>
        `
  });
  root.innerHTML = tableHTML
}

// Search for student list
function filterStudent() {
  let input, filter, table, tr, td, cell, i, j;
  filter = document.getElementById("searchInput").value.toLowerCase();
  table = document.getElementById("userTable");
  tr = table.getElementsByTagName("tr")
  for (let i = 1; i < tr.length; i++) {
    tr[i].style.display = "none"
    const tdArray = tr[i].getElementsByTagName("td")
    for (let j = 0; j < tdArray.length; j++) {
      const cellValue = tdArray[j];
      if (cellValue && cellValue.innerHTML.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        break;
      }
    }
  }
}