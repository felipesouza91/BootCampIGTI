window.addEventListener("load", start);

function start() {
  console.log("Aula 08");
  console.log("Pagina totalmente carregad");
  var input = document.querySelector("#nome");
  input.addEventListener("keyup", countName);
  var form = document.querySelector("form");
  form.addEventListener("submit", preventSubmit);
}

function preventSubmit(event) {
  event.preventDefault();
}

function countName(event) {
  var nameLength = document.querySelector("#nameLength");
  nameLength.textContent = event.target.value.length;
}
