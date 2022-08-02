// Global variables
let students = [];
const root = document.querySelector(".student-table");
const showGradeOnly = document.getElementsByClassName("grade");

// Display data from fetch
function displayStudentsFromFetch(data) {
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

// Search for student list using search bar
function filterStudentInSearchBar() {
  let filter = document.getElementById("searchInput").value.toLowerCase();
  let table = document.getElementById("userTable");
  let tr = table.getElementsByTagName("tr")
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

// Filter the students using dropdown grade element
function filterGradeByDropdown(event) {
  let gradeSelected = event.target.value;
  let table = document.getElementById("userTable");
  let tr = table.getElementsByTagName("tr");
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

// Insert a new row into the list
function insertNewRowInputToList() {
  let tableHTML = '';
  tableHTML =
    `
      <tr class="x bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
              <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
              <td onclick="replaceOldInputWithNewInput(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
              <td onclick="removeRowAndFromLocalStorage(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
      </tr>
      `
  root.innerHTML += tableHTML;

  // Hide the add button
  let addButton = document.querySelector(".add");
  addButton.style.display = "none";

  // Show the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "";
}

// Remove previous input row and reload into table
function removeRowAndAddReload() {
  const input = document.querySelectorAll(".userInput");
  let array = JSON.parse(localStorage.getItem("students")) || [];
  let student = {
    name: input[0].value,
    email: input[1].value,
    grade: input[2].value
  }

  // Remove previous row 
  let prevTagToRemove = document.querySelectorAll(".x");
  prevTagToRemove.forEach(item => item.remove())
 
  // Push the new student obj to the array
  array.push(student);

  // Save to localstorage
  localStorage.setItem('students', JSON.stringify(array));

  // Reload table to show the new student
  root.innerHTML = "";
  window.onload();

  // Hide the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "none";

  // Hide the save button
  let addButton = document.querySelector(".add");
  addButton.style.display = "";
} 

// Delete row completely and including from local storage
function removeRowAndFromLocalStorage(event) {
  let array = (JSON.parse(localStorage.getItem('students')));
  let x = event.target.parentElement.children;
  let student = {
    name : x[0].innerHTML,
    email : x[1].innerHTML,
    grade : x[2].innerHTML
  }

  let indexOfRowToDelete = array.findIndex((students) => students.email === student.email);
  array.splice(indexOfRowToDelete, 1);
  localStorage.setItem("students", JSON.stringify(array));
  event.target.parentElement.remove()
}

// Get the index of the row clicked
function findIndex() {
  let b = document.querySelector('.student-table');
  b.addEventListener('click', (e) => {
    let x = e.path[1].dataset.id;
    if(x !== undefined) {
      idOfSelectedParagraph = x;
    } 
  });
}

function replaceOldInputWithNewInput(event) {

  findIndex()

  // Replace old tag with new input tag that includes previous data
  let tagToEdit = event.target.parentElement;
  let prevStudentInfo = {
    name : tagToEdit.children[0].innerHTML,
    email : tagToEdit.children[1].innerHTML,
    grade : tagToEdit.children[2].innerHTML
  }

  tagToEdit.remove()
  insertNewRowInputToList()

  // the new student info
  let inputName = document.getElementById("fname");
  let inputEmail = document.getElementById("femail");
  let inputGrade = document.getElementById("fnumber");

  inputName.value = prevStudentInfo.name;
  inputEmail.value = prevStudentInfo.email;
  inputGrade.value = prevStudentInfo.grade;

  // Hide the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "none";
  
  // Hide the update button
  let updateButton = document.querySelector(".update");
  updateButton.style.display = "";
}

function updateNewEditValue() {
  let inputName = document.getElementById("fname");
  let inputEmail = document.getElementById("femail");
  let inputGrade = document.getElementById("fnumber");

    let name = inputName.value;
    let email = inputEmail.value;
    let grade = inputGrade.value;

    let array = JSON.parse(localStorage.getItem("students") || []);
   
    array[idOfSelectedParagraph] = {name, email, grade};
    localStorage.setItem("students", JSON.stringify(array) || []);

    root.innerHTML = "";
    window.onload()

    // Hide the update button
    let updateButton = document.querySelector(".update");
    updateButton.style.display = "none";

    // Hide the add button
    let addButton = document.querySelector(".add");
    addButton.style.display = "";
}

window.onload = function() {
  if(localStorage.students && localStorage.students !== "undefined" && localStorage.students !== "null"){
    let a = (JSON.parse(localStorage.getItem('students')));
    for(let i=0;i<a.length;i++) {
      let tableHTML = '';
      tableHTML =
        `
          <tr data-id="${i}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].name]}</td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].email]}</td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].grade]}</td>
                  <td onclick="replaceOldInputWithNewInput(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="removeRowAndFromLocalStorage(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
          root.innerHTML += tableHTML;
    }
  } else {
    return null;
  }
};