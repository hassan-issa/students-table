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

  // Add a student to UI and local storage
  function addStudent(event) {
      let tableHTML = '';
      tableHTML =
        `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
                  <td onclick="editStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="deleteStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
      root.innerHTML += tableHTML;
      SaveDataToLocalStorage("name", "email", "grade");
  }

  // Save student UI and index user input to local storage
  function saveStudent(event) {
    const input = document.querySelectorAll(".userInput");
    let name = input[0].value;
    let email = input[1].value;
    let grade = input[2].value;
    let studentToArray = {name, email, grade}
    root.lastElementChild.remove();
    let array = JSON.parse(localStorage.getItem("students"));

    for(let i=0;i<array.length;i++) {
      if(array[i].name === "name") {
        console.log("new one")
        let newTag = array[i];
        let indexNumber = array.indexOf(newTag);
        array[indexNumber] = studentToArray;
        localStorage.setItem("students", JSON.stringify(array));
      }
    }

    let tableHTML = '';
      tableHTML =
        `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${name}</td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${email}</td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white">${grade}</td>
                  <td onclick="editStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="deleteStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
    root.innerHTML += tableHTML;     
  }

  // Delete student UI and from local storage
  function deleteStudent(event) {
    let dataArray = (JSON.parse(localStorage.getItem('students')));
    for(let i=0;i<dataArray.length;i++) {
      let prevName = dataArray[i].name;
      let prevEmail = dataArray[i].email;
      let prevGrade = dataArray[i].grade;
      if(dataArray[i].name === prevName && dataArray[i].email === prevEmail && dataArray[i].grade === prevGrade) {
        dataArray.splice(dataArray.findIndex(s => s.name === prevName), 1);
        localStorage.setItem("students", JSON.stringify(dataArray));
      }
    }
     event.target.parentElement.remove();
  }

  function editStudent(event) {
    event.target.parentNode.remove()
    let dataArray = (JSON.parse(localStorage.getItem('students')));
    let tagToEdit = event.target.parentElement;
    let name = tagToEdit.children[0];
    let email = tagToEdit.children[1];
    let grade = tagToEdit.children[2];
    let tableHTML = '';
    tableHTML =
      `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
                <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
                <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
                <td onclick="editStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                <td onclick="deleteStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
        </tr>
        `
    root.innerHTML += tableHTML;

    let inputName = document.getElementById("fname");
    let inputEmail = document.getElementById("femail");
    let inputGrade = document.getElementById("fnumber");
    inputName.value = name.innerHTML;
    inputEmail.value = email.innerHTML;
    inputGrade.value = grade.innerHTML;
    let nameS = name.innerHTML;
    let emailS = email.innerHTML;
    let gradeS = grade.innerHTML;

    // for(let i=0;i<dataArray.length;i++) {
    //   if(dataArray[i].name === name.innerHTML && dataArray[i].email === email.innerHTML && dataArray[i].grade === grade.innerHTML) {
    //     let indexNumber = dataArray.findIndex(s => s.name === name.innerHTML);
    //     dataArray[indexNumber] = newStudentData;
    //     localStorage.setItem("students", JSON.stringify(dataArray));
    //   }
    // }
  }


  

  // Save to local storage
  function SaveDataToLocalStorage(name, grade, email) {  
    let studentData = {name, grade, email}
    let a = [];
    a = JSON.parse(localStorage.getItem('students')) || [];
    a.push(studentData);
    localStorage.setItem('students', JSON.stringify(a));
  }

  // // Reload local storage
  window.onload = function() {
    if(localStorage.length > 0) {
      let a = (JSON.parse(localStorage.getItem('students')));
      a.forEach(student => {
      let tableHTML = '';
      tableHTML =
        `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.name}</td>
                  <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.email}</td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white">${student.grade}</td>
                  <td onclick="editStudent(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="deleteStudent(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
          root.innerHTML += tableHTML;
       })
    }
  };