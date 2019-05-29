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
        person.name.first,
        person.name.last,
        person.email,
        person.location.city,
        person.phone,
        person.location.street,
        person.dob.date
      )
  );
  return Promise.all(employeeTable);
}

function generateHTML(data) {
  const main = document.getElementById("main");
  let textHTML = data.map(person => {
    let tag = `
            <div class="card">
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
