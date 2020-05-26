window.addEventListener("load", () => {
  fetch("https://api.github.com/users/rrgomide")
    .then((respose) => {
      respose.json().then((data) => showData(data));
    })
    .catch((error) => error);

  divisionPromise(2, 0).then((res) => console.log(res));
  divisionPromise(0, 2).then((res) => console.log(res));
  runAsyncDivision();
});

async function runAsyncDivision() {
  const response = await divisionPromise(6, 2);
  console.log(response);
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("Não é possivel dividir por zero");
    }
    resolve(a / b);
  });
}

function showData(data) {
  var div = document.querySelector("div");
  div.textContent = JSON.stringify(data);
}
