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