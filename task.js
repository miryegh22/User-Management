const tbody = document.querySelector(".tbody");
const table = document.querySelector(".table");
const DeleteAction = document.querySelector(".delete-button");
const SaveAction = document.querySelector(".save");
const editform = document.querySelector(".editform");
const editDiv = document.querySelector("#editEmployeeModal");
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let html = "";
      data.map((user) => {
        html += `<tr class="${user.id}">
            <td>${user.name}</td>
            <td>${user.username}</td>                        
            <td>${user.email}</td>
            <td>${user.website}</td>
            <td>${user.phone}</td>
            <td>${user.company.name}</td>
            <td>
            <a href="#editEmployeeModal" class="editBtn"><i class="material-icons editicon" ">&#xE147;</i></a >
            <a href="#deleteEmployeeModal" class="deleteBtn"><i class="material-icons delicon" data-toggle="tooltip" title="Delete">&#xE872;</i></a >
            </td>
        </tr>`;
      });
      document.querySelector(".tbody").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();
const names = document.querySelector("#name");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const website = document.querySelector("#website");
const phone = document.querySelector("#phone");
const company = document.querySelector("#company");
const inputs = [
  names.value,
  username.value,
  email.value,
  website.value,
  phone.value,
  company.value,
];

const addnewuserbutton = document.querySelector(".addemploye");
const AddDiv = document.querySelector("#addEmployeeModal");
addnewuserbutton.addEventListener("click", (e) => {
  if (AddDiv.style.display === "" || AddDiv.style.display === "none") {
    AddDiv.style.display = "block";
  }
});
const close = document.querySelector(".close");
close.addEventListener("click", (e) => {
  AddDiv.style.display = "none";
});
const Add = document.querySelector(".addnewuser");
const form = document.querySelector(".forms");
let i = 11;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newh = document.createElement("tr");

  newh.innerHTML = `
    <td>${names.value}</td>
    <td>${username.value}</td>                        
    <td>${email.value}</td>
    <td>${website.value}</td>
    <td>${phone.value}</td>
    <td>${company.value}</td>
    <td>
    <a href="#editEmployeeModal" class="editBtn"><i class="material-icons editicon" ">&#xE147;</i></a >
    <a href="#deleteEmployeeModal" class="deleteBtn"><i class="material-icons delicon" data-toggle="tooltip" title="Delete">&#xE872;</i></a >
    </td>
    `;
  tbody.appendChild(newh);
  i++;
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify({
      id: i,
      name: names.value,
      username: username.value,
      email: email.value,
      website: website.value,
      phone: phone.value,

      company: company.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) =>
      console.log({
        id: json.id,
        name: json.name,
        username: json.username,
        email: json.email,
        website: json.website,
        phone: json.phone,
        company: json.company,
      })
    );

  AddDiv.style.display = "none";
  names.value = "";
  username.value = "";
  email.value = "";
  website.value = "";
  phone.value = "";
  company.value = "";
});

function onDeleteRow(evt) {
  if (!evt.target.classList.contains("delicon")) {
    return;
  }
  DeleteAction.addEventListener("click", () => {
    const delbutton = evt.target;
    let id = delbutton.closest("tr").remove();
    let k = evt.target.parentElement.parentElement.parentElement.className;
    fetch(`https://jsonplaceholder.typicode.com/users/${k}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
  });
}
table.addEventListener("click", onDeleteRow);
const inputname = document.querySelector(".inputname");
const inputemail = document.querySelector(".inputemail");
const inputphone = document.querySelector(".inputphone");
const inputcompany = document.querySelector(".inputcompany");
const savebutton = document.querySelector(".savebutton");
function onEditRow(evt) {
  if (!evt.target.classList.contains("editicon")) {
    return;
  }
  const editbutton = evt.target;
  // inputname.value=editbutton.closest('tr').firstChild.text;
  inputname.value = editbutton
    .closest("tr")
    .getElementsByTagName("td")[0].innerHTML;
  inputname.addEventListener("change", (e) => {
    inputname.value = e.target.value;
  });
  inputemail.value = editbutton
    .closest("tr")
    .getElementsByTagName("td")[2].innerHTML;
  inputemail.addEventListener("change", (e) => {
    inputemail.value = e.target.value;
  });
  inputphone.value = editbutton
    .closest("tr")
    .getElementsByTagName("td")[4].innerHTML;
  inputphone.addEventListener("change", (e) => {
    inputemail.value = e.target.value;
  });
  inputcompany.value = editbutton
    .closest("tr")
    .getElementsByTagName("td")[5].innerHTML;
  inputcompany.addEventListener("change", (e) => {
    inputemail.value = e.target.value;
  });
  savebutton.addEventListener("click", (e) => {
    editbutton.closest("tr").getElementsByTagName("td")[0].innerHTML =
      inputname.value;
    editbutton.closest("tr").getElementsByTagName("td")[2].innerHTML =
      inputemail.value;
    editbutton.closest("tr").getElementsByTagName("td")[4].innerHTML =
      inputphone.value;
    editbutton.closest("tr").getElementsByTagName("td")[5].innerHTML =
      inputcompany.value;
  });

  let id = evt.target.parentElement.parentElement.parentElement.className;
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      name: inputname.value,
      username: username.value,
      email: inputemail.value,
      website: website.value,
      phone: inputphone.value,

      company: inputcompany.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) =>
      console.log({
        id: json.id,
        name: json.name,
        username: json.username,
        email: json.email,
        website: json.website,
        phone: json.phone,
        company: json.company,
      })
    );
}
table.addEventListener("click", onEditRow);
