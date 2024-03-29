// Global variables
let students = [];
// Reterieves the entire body of the table.
const root = document.querySelector(".student-table");
// Retrieves all the grade elements displayed in the table. 
const showGradeOnly = document.getElementsByClassName("grade");
// Array created to manage the grades filter from the data in the table.
let currentOption = [];

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
  root.innerHTML = tableHTML;
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

// Insert a new row into the table
function insertNewRowInputToList() {
  let tableHTML = '';
  tableHTML =
    `
      <tr class="x bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput userName shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
              <td class="py-4 email px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
              <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
              <td onclick="replaceOldInputWithNewInput(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
              <td onclick="removeRowAndFromLocalStorage(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
      </tr>
      `
  // Insert the created row into the HTML.
  root.innerHTML += tableHTML;
  // Hide the add button
  let addButton = document.querySelector(".add");
  addButton.style.display = "none";
  // Show the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "";
  // Focus on name input field
  setFocusToTextBox();
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
  if(student.name.length <= 2){
    alert("Name must be 3 characters or greater.")
    // Show the save button
    let saveButton = document.querySelector(".save");
    saveButton.style.display = "";
    // Hide the add button
    let addButton = document.querySelector(".add");
    addButton.style.display = "none";
  } else if (!validateEmail(student.email)) {
    alert("Please enter a valid email.")
    // Show the save button
    let saveButton = document.querySelector(".save");
    saveButton.style.display = "";
    // Hide the add button
    let addButton = document.querySelector(".add");
    addButton.style.display = "none";
  } else if(checkIfEmailIsUnqiue(student.email)) {
    alert("This email already exists.")
        // Show the save button
        let saveButton = document.querySelector(".save");
        saveButton.style.display = "";
        // Hide the add button
        let addButton = document.querySelector(".add");
        addButton.style.display = "none";
  }
  else {
  // Check if the grade already is in our grade array, if not then add.
  checkIfValueInGradeArray(student.grade) ? null : currentOption.push(student.grade);
  // Remove previous row
  let prevTagToRemove = document.querySelectorAll(".x");
  prevTagToRemove.forEach(item => item.remove())
  // Push the new student obj to the local storage array
  array.push(student);
  // Save to localstorage
  localStorage.setItem('students', JSON.stringify(array));
  // Reload table to show the new student
  root.innerHTML = "";
  reloadRowsIntoDisplay();
  // Clear all of the option from the grades dropdown filter
  emptyGradesElementOptions();
  // Add the grades to the grades dropdown filter
  addEachNumberToGradeFilter();
  // Hide the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "none";
  // Show the add button
  let addButton = document.querySelector(".add");
  addButton.style.display = "";
  }
};

// Find the index of the row clicked
function findIndex() {
  let b = document.querySelector('.student-table');
  b.addEventListener('click', (e) => {
    let x = e.path[1].dataset.id;
    if(x !== undefined) {
      idOfSelectedParagraph = x;
    }
  });
}

// Delete row completely, including from local storage and grades filter.
function removeRowAndFromLocalStorage(event) {
  if(confirm("Are you sure you would like to delete?")) {
    let array = (JSON.parse(localStorage.getItem('students')));
    let x = event.target.parentElement.children;
    let student = {
      name : x[0].innerHTML,
      email : x[1].innerHTML,
      grade : x[2].innerHTML
    }
    // Check if the grade is already an option
    let boolean = checkIfTheSameGradeExist(student.grade);
    // Find the index to delete
    let indexOfRowToDelete = array.findIndex((students) => students.name === student.name);
    // Convert the grade inputed to a string
    let toStringOption = student.grade.toString();
    // Find the index of the grade in the select dropdown element
    let indexOfOptionToRemove = currentOption.indexOf(toStringOption);
    // If the grade already exist, return null, if it only exists 1 than remove it from the grade dropdown filter.
    boolean ? null: currentOption.splice(indexOfOptionToRemove, 1);
    // Remove the Node from local storage
    array.splice(indexOfRowToDelete, 1);
    // Set local storage and remove node from DOM
    localStorage.setItem("students", JSON.stringify(array));
    event.target.parentElement.remove()
    // Remove all grades from grades filter
    emptyGradesElementOptions();
    // Re-load the grade filter dropdown
    addEachNumberToGradeFilter();
    // Make sure correct buttons are set
    let updateButton = document.querySelector(".update");
    updateButton.style.display = "none";
    let saveButton = document.querySelector(".save");
    saveButton.style.display = "none"
    let addButton = document.querySelector(".add");
    addButton.style.display = ""
    } else {
      return null;
    }
};

// This function will replace the old row with a new row
function replaceOldInputWithNewInput(event) {
  // Find the index of the row clicked
  findIndex()
  // Replace old tag with new input tag that includes previous data
  let tagToEdit = event.target.parentElement;
  let prevStudentInfo = {
    name : tagToEdit.children[0].innerHTML,
    email : tagToEdit.children[1].innerHTML,
    grade : tagToEdit.children[2].innerHTML
  }
  // Create the new student row to replace
  let tr = document.createElement("tr");
  tr.className = "x bg-white border-b dark:bg-gray-800 dark:border-gray-700";
  tr.innerHTML = 
  `
  <tr class="x bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput userName shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fname" type="text" placeholder="Enter Name"></input></td>
          <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="femail" type="email" placeholder="Enter Email"></input></td>
          <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white"><input class="userInput shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fnumber" type="number" placeholder="Enter Grade" grade"></input></td>
          <td onclick="replaceOldInputWithNewInput(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
          <td onclick="removeRowAndFromLocalStorage(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
  </tr>
  `;
  // Replace the row with a new row
  let rowClickedToEdit = event.path[1];
  rowClickedToEdit.replaceWith(tr);
  // the new student info
  let inputName = document.getElementById("fname");
  let inputEmail = document.getElementById("femail");
  let inputGrade = document.getElementById("fnumber");
  inputName.value = prevStudentInfo.name;
  inputEmail.value = prevStudentInfo.email;
  inputGrade.value = prevStudentInfo.grade;
  // Remove all grades from grades filter
  emptyGradesElementOptions();
  // Re-load the grade filter dropdown
  addEachNumberToGradeFilter();
  // Hide the save button
  let saveButton = document.querySelector(".save");
  saveButton.style.display = "none";
  // Hide the add button
  let addButton = document.querySelector(".add");
  addButton.style.display = "none";
  // Hide the update button
  let updateButton = document.querySelector(".update");
  updateButton.style.display = "";
  // Focus on name input field
  setFocusToTextBox();
}

// Update the row selected and the grade element dropdown
function updateNewEditValue() {
  let inputName = document.getElementById("fname");
  let inputEmail = document.getElementById("femail");
  let inputGrade = document.getElementById("fnumber");
    // Retrieve the input fields from row
    let name = inputName.value;
    let email = inputEmail.value;
    let grade = inputGrade.value;
    if(name.length <= 2){
      alert("Name must be 3 characters or greater.")
      // Hide the save button
      let saveButton = document.querySelector(".save");
      saveButton.style.display = "none";
      // Hide the add button
      let addButton = document.querySelector(".add");
      addButton.style.display = "none";
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email.")
      // Hide the save button
      let saveButton = document.querySelector(".save");
      saveButton.style.display = "none";
      // Hide the add button
      let addButton = document.querySelector(".add");
      addButton.style.display = "none";
    } else if(checkIfEmailIsUnqiue(email)) {
      alert("This email already exists.")
          // Show the save button
          let saveButton = document.querySelector(".save");
          saveButton.style.display = "none";
          // Hide the add button
          let addButton = document.querySelector(".add");
          addButton.style.display = "none";
    } else {
    // Parse the student array in local storage
    let array = JSON.parse(localStorage.getItem("students") || []);
    // Update index in student array / local storage
    array[idOfSelectedParagraph] = {name, email, grade};
    // Update the array inside of grades dropdown
    let x = currentOption.indexOf(idOfSelectedParagraph);
    let newArray = currentOption.slice(x, (x + 1));
    currentOption = newArray;
    // Set the update index of array back into local storage
    localStorage.setItem("students", JSON.stringify(array) || []);
    // Clear the table and reload updated storage
    root.innerHTML = "";
    reloadRowsIntoDisplay();
    // Hide the update button
    let updateButton = document.querySelector(".update");
    updateButton.style.display = "none";
    // Show the add button
    let addButton = document.querySelector(".add");
    addButton.style.display = "";
    // Clear all of the option from the grades dropdown filter
    emptyGradesElementOptions();
    // Add the grades to the grades dropdown filter
    addEachNumberToGradeFilter();
  }
};

// Reloads each row back into DOM from local storage.
window.addEventListener('DOMContentLoaded', (reloadRowsIntoDisplay()));
function reloadRowsIntoDisplay() {
  if(localStorage.students && localStorage.students !== "undefined" && localStorage.students !== "null"){
    let a = (JSON.parse(localStorage.getItem('students')));
    for(let i=0;i<a.length;i++) {
      let tableHTML = '';
      tableHTML =
        `
          <tr data-id="${i}" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="name py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].name]}</td>
                  <td class="py-4 email px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].email]}</td>
                  <td class="py-4 px-6 grade font-medium text-gray-900 whitespace-nowrap dark:text-white">${[a[i].grade]}</td>
                  <td onclick="replaceOldInputWithNewInput(event)" class="edit py-4 px-6  bg-[url('./edit.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-indigo-300 cursor-pointer bg-no-repeat"></td>
                  <td onclick="removeRowAndFromLocalStorage(event)" class="delete py-4 px-6 bg-[url('./delete.svg')] bg-[length:15px_15px] bg-center border-2 hover:border-rose-300 cursor-pointer bg-no-repeat"></td>
          </tr>
          `
          // Insert row into DOM.
          root.innerHTML += tableHTML;
          // Only add the number to Grade Select Filter if it does not already exist
          checkIfValueInGradeArray(a[i].grade) ? null : currentOption.push(a[i].grade);
    }
  } else {
    return null;
  }
};

// Adds an option element to the grades dropdown select element
window.addEventListener('DOMContentLoaded', (addEachNumberToGradeFilter()));
function addEachNumberToGradeFilter() {
  currentOption.forEach(x => {
    let gradeDropDown = document.getElementById("grade");
    let element = document.createElement("option");
    element.className = "bg-slate-200 text-black";
    element.className = "addedGradeOption";
    element.value = x;
    element.innerHTML = x;
    gradeDropDown.appendChild(element);
  })
};

// Clear the grades dropdown filter
function emptyGradesElementOptions() {
  document.getElementById("grade").options.length = 1;
};

// Check if the number already exists in our grades array
function checkIfValueInGradeArray(value) {
  if(currentOption.includes(value)) {
    return true;
  } else {
    return false;
  }
}

// Check if the same number already exist in student data
function checkIfTheSameGradeExist(value) {
  let boxOfGrades = []
  let eachGrade = document.getElementsByClassName("grade");
  for(let i=1;i<eachGrade.length;i++) {
    boxOfGrades.push(eachGrade[i].innerHTML)
  }
  const filtered = boxOfGrades.filter((v, i) => boxOfGrades.indexOf(v) !== i)
  if(filtered.includes(value)) {
    return true;
  } else {
    return false;
  }
}

// Check if email is valid
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};  

// Functionality to submit using "enter" keyword
root.addEventListener("keyup", (event) => {
  let updateButton = document.querySelector(".update");
  let saveButton = document.querySelector(".save");
  if (event.keyCode === 13 && updateButton.style.display === "") {
    updateNewEditValue()
  } else if (event.keyCode === 13 && saveButton.style.display === ""){
    removeRowAndAddReload()
  }
});

// Functionality that adds focus to name input field
function setFocusToTextBox(){
  document.querySelector(".userName").focus();
}

// Check to see if email has already been used
function checkIfEmailIsUnqiue(value) {
  let emailAlreadyExist = "";
  let eachEmailEntered = document.getElementsByClassName("email");
  for(let i=0;i<eachEmailEntered.length;i++) {
    let email = eachEmailEntered[i];
    if(email.innerHTML === value) {
      return true;
    }
  }
};

// Gather the table data and join into CSV format
function tableToCSV() {
  // Variable to store the final csv data
  var csv_data = [];
  // Get each row data
  var rows = document.getElementsByTagName('tr');
  for (var i = 0; i < rows.length; i++) {
      // Get each column data
      var cols = rows[i].querySelectorAll('td,th');
      // Stores each csv row data
      var csvrow = [];
      for (var j = 0; j < cols.length; j++) {
          // Get the text data of each cell of
          // a row and push it to csvrow
          csvrow.push(cols[j].innerHTML);
      }
      // Combine each column value with comma
      csv_data.push(csvrow.join(","));
  }
  // combine each row data with new line character
  csv_data = csv_data.join('\n');
  // call the download function
  downloadCSVFile(csv_data);
}

// Function to download the CSV File
function downloadCSVFile(csv_data) {
  // Create CSV file object and feed our
  // csv_data into it
  CSVFile = new Blob([csv_data], { type: "text/csv" });
  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement('a');
  // Download csv file
  temp_link.download = "Table.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;
  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);
  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}