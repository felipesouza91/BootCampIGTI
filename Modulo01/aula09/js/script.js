window.addEventListener("load", start);
var listNames = [];
function start() {
  var form = document.querySelector("form");
  var ul = document.querySelector("ul");
  ul.addEventListener("click", clickList);
  form.addEventListener("submit", preventSubmit);
}
function preventSubmit(event) {
  event.preventDefault();
  var inputName = document.querySelector("#name");

  save(inputName);
  inputName.value = "";
  renderList();
}

function save(inputName) {
  const id = inputName.getAttribute("data-id");
  console.log(id);
  if (id) {
    listNames[id] = inputName.value;
  } else {
    listNames.push(inputName.value);
  }
}
function renderList() {
  var list = document.querySelector("ul");
  console.log(list.children);
  var li = document.createElement("li");
  var button = document.createElement("button");
  button.textContent = "Excluir";
  li.setAttribute("id", listNames.length - 1);
  li.textContent = listNames[listNames.length - 1];
  li.appendChild(button);
  list.appendChild(li);
}

function clickList(event) {
  const id = event.target.id;
  var input = document.querySelector("#name");
  input.setAttribute("data-id", id);
  input.value = listNames[id];
}
