// CREATE EMPLOYEE TABLES //

window.employeeTable = window.employeeTable || [];
let employeeTable = window.employeeTable;

// CREATE EMPLOYEE CLASS //
class Employee {
  constructor(img, firstName, lastName, email, city, phone, address, birthday) {
    this.img = img;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.city = city;
    this.phone = phone;
    this.address = address;
    this.birthday = birthday;
  }
}

// Steps //
// 1) Fetch data for 12 users
// 2) Put data into EmployeeTable - return Employee Table
// 3) Generate HTML

fetch("https://randomuser.me/api/?results=12")
  .then(res => res.json())
  .then(generateTable)
  .then(generateHTML)
  .catch(err => console.error(err));

function generateTable(data) {
  employeeTable = data.results.map(
    person =>
      new Employee(
        person.picture.large,
        person.name.first.capitalize(),
        person.name.last.capitalize(),
        person.email,
        person.location.city.capitalize(),
        person.phone,
        person.location.street.capitalize(),
        person.dob.date
      )
  );
  return Promise.all(employeeTable);
}

function generateHTML(data) {
  const main = document.getElementById("main");
  let textHTML = data.map((person, index) => {
    let tag = `
            <div id="${index}" class="card">
            <img
             id="card-image"
             src="${person.img}"
             />
             <div class="card-inner">
             <h2 class="card-name">${person.firstName} ${person.lastName}</h2>
             <p class="card-email">${person.email}</p>
             <p class="card-city">${person.city}</p>
             </div>
         </div>`;
    return tag;
  });
  main.innerHTML = textHTML.join("");
}

// MODAL ------------------------------------------------------------------------------------------------------ //
const main = document.getElementById("main");
const modal = document.getElementById("simpleModal");
const card = document.getElementsByClassName("card");
const closeBtn = document.getElementsByClassName("closeBtn")[0];

// Event listeners

main.addEventListener("click", e => {
  if ((e.target = card)) {
    openModal();
  }
});

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", clickOutside);

// Functions

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}

function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// ------------------------------------------------------------------------------------------------------------------------ //
// CAPITALIZE FUNCTION capitalize()
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
