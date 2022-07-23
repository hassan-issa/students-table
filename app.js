// Global variables
let students = [];
const root = document.querySelector(".student-table");
const grade = document.getElementsByClassName("grade");

// Fetch data
fetch("")
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
                <td class="py-4 px-6 name font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.name}</td>
                <td class="py-4 px-6 email">${student.email}</td> 
                <td class="py-4 px-6 grade">${student.grade}</td>
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

  // Add a student
  function addStudent(event) {
    if(event.target.innerHTML === "Add") {
      event.target.innerHTML = "Save"
      let tableHTML = '';
      tableHTML +=
        `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
                  <td onclick="updateStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="updateStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
          root.innerHTML += tableHTML;
    } else {
      event.target.innerHTML = "Add"
      const input = document.querySelectorAll(".userInput");
      let name = input[0].value;
      let email = input[1].value;
      let grade = input[2].value;

      if(name.length > 0) {
        // Add to local storage
        let studentData = {name, email, grade}
        let array = [];
        array.push(studentData);
        array = array.concat(JSON.parse(localStorage.getItem('array')||'[]'));
        localStorage.setItem("array", JSON.stringify(array));
  
        for (let i = 0; i < 3; i++) {
          let inputTag = input[i];
          let inputValue = inputTag.value;
          inputTag.parentElement.innerHTML = inputValue;
          inputTag.remove();
        }
      } else {
       root.lastElementChild.remove();
      }
    }
  };

  // Update or delete student
  function updateStudent(event) {
    let el = event.target;
    let addButton = document.getElementsByClassName('add');
    let tagToEdit = event.target.parentNode.children;
    let prevName = tagToEdit[0].textContent;
    let prevEmail = tagToEdit[1].textContent;
    let prevGrade = tagToEdit[2].textContent;

    if(el.className[0] === 'd') {
    // Delete from local storage
    let dataArray = (JSON.parse(localStorage.getItem('array')));
    for(let i=0; i < dataArray.length; i++) {
      if(dataArray[i].name === prevName && dataArray[i].email === prevEmail && dataArray[i].grade === prevGrade) {
        dataArray.splice(dataArray.findIndex(s => s.name === prevName),1);
        localStorage.setItem("array", JSON.stringify(dataArray));
      }
    }
      el.parentElement.remove();
      addButton[0].innerHTML = "Add";
    } else {
        el.parentElement.remove();
        addButton[0].innerHTML = "Save";
        let tableHTML = '';
        tableHTML =
          `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
                    <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
                    <td onclick="updateStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                    <td onclick="updateStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
            </tr>
            `
            root.innerHTML += tableHTML;
            let input = document.getElementsByTagName("input");
            input[1].value = prevName;
            input[2].value = prevEmail;
            input[3].value = prevGrade;
    }
  }

  // Reload local storage
  window.onload = function() {
    if(localStorage.length > 0) {
      let dataArray = (JSON.parse(localStorage.getItem('array')));
      dataArray.reverse().forEach(student => {
        let tableHTML = '';
      tableHTML =
        `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.name}</td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.email}</td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.grade}</td>
                  <td onclick="updateStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="updateStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
          root.innerHTML += tableHTML;
       })
    }
  };