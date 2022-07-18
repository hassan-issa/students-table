// Global variables
let students = [];
const root = document.querySelector(".student-table");
const grade = document.getElementsByClassName("grade");

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
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.name}</td>
                <td class="py-4 px-6">${student.email}</td> 
                <td class="py-4 px-6 grade">${student.grade}</td>
                <td class="py-4 px-6">${student.id}</td>
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

// Search for grade list
function searchGrade(event) {
  let gradeSelected = event.target.value;
  table = document.getElementById("userTable");
  tr = table.getElementsByTagName("tr");
  for(let i = 1; i < tr.length; i++) {
    tr[i].style.display = "none";
    const tdArray = tr[i].querySelector(".grade");
    if(tdArray.innerHTML === gradeSelected){
      tdArray.parentNode.style.display = "";
    } else if (gradeSelected === "Grade") {
      tdArray.parentNode.style.display = "";
      }
    }
  }