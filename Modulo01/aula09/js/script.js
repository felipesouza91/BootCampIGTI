window.addEventListener("load", start);
var listNames = [];
function start() {
  var form = document.querySelector("form");
  var ul = document.querySelector("ul");
  var input = document.querySelector("#name");

  ul.addEventListener("click", clickList);
  form.addEventListener("submit", preventSubmit);
  input.addEventListener("keyup", onInputPressKey);
}
function preventSubmit(event) {
  event.preventDefault();
}

function onInputPressKey(event) {
  if (event.key === "Enter") {
    save(event.target.value);
    renderList();
  }
}

function save(value) {
  var inputName = document.querySelector("#name");
  const id = inputName.getAttribute("data-id");
  if (id && id !== null) {
    listNames[id] = value;
  } else {
    listNames.push(value);
  }

  clearInput();
}
function clearInput() {
  var inputName = document.querySelector("#name");
  inputName.value = "";
  inputName.removeAttribute("data-id");
}

function renderList() {
  var list = document.querySelector("ul");
  list.innerHTML = "";
  for (var i = 0; i < listNames.length; i++) {
    var button = createButtonElement(i);
    var li = createLiElement(i, listNames[i], button);
    list.appendChild(li);
  }
}

function createLiElement(id, name, button) {
  var li = document.createElement("li");
  li.setAttribute("id", id);
  li.textContent = name;
  li.appendChild(button);
  return li;
}

function createButtonElement(id) {
  var button = document.createElement("button");
  button.textContent = "Excluir";
  button.setAttribute("data-id", id);
  button.addEventListener("click", onRemove);
  return button;
}

function clickList(event) {
  const id = event.target.id;
  var input = document.querySelector("#name");
  input.setAttribute("data-id", id);
  input.value = listNames[id];
}

function onRemove(event) {
  console.log(event.target.attributes);
  var id = event.target.attributes[0].value;
  listNames.splice(id, 1);
  renderList();
}
