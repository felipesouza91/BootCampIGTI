var listNames = [];
var inputName = document.querySelector("#name");
var form = document.querySelector("form");
var ul = document.querySelector("ul");
var input = document.querySelector("#name");

window.addEventListener("load", () => {
  ul.addEventListener("click", clickList);
  form.addEventListener("submit", preventSubmit);
  input.addEventListener("keyup", onInputPressKey);
});

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
  const id = inputName.getAttribute("data-id");
  if (id && id !== null) {
    listNames[id] = value;
  } else {
    listNames.push(value);
  }
  clearInput();
}
function clearInput() {
  inputName.value = "";
  inputName.removeAttribute("data-id");
}

function renderList() {
  ul.innerHTML = "";
  clearInput();
  listNames.forEach((item, i) => {
    var button = createButtonElement(i);
    var li = createLiElement(i, item, button);
    ul.appendChild(li);
  });
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
  if (id) {
    inputName.setAttribute("data-id", id);
    inputName.value = listNames[id];
  } else {
    inputName.value = "";
  }
}

function onRemove(event) {
  var id = event.target.attributes[0].value;
  listNames.splice(id, 1);
  clearInput();
  renderList();
}
