var searchInput = null;
var divStatics = null;
var divUsers = null;
var submitButton = null;
var useTitle = null;
var statisticsTitle = null;
var findersUsers = [];
var userList = [];

window.addEventListener('load', () => {
  searchInput = document.querySelector('#inputFilter');
  submitButton = document.querySelector('#submitButton');
  divStatics = document.querySelector('#statics');
  divUsers = document.querySelector('#list');
  useTitle = document.querySelector('#finderTitle');
  statisticsTitle = document.querySelector('#statisticsTitle');
  searchInput.value = '';
  searchInput.addEventListener('keyup', searchUserEnter);
  submitButton.addEventListener('click', searchUserClick);
  fetchUsers();
});

function searchUserEnter(event) {
  if (event.target.value.length > 0) {
    submitButton.removeAttribute('disabled');
    if (event.key === 'Enter') {
      const filter = event.target.value.toLowerCase();
      searchUser(filter);
    }
  } else {
    findersUsers = [];
    submitButton.setAttribute('disabled', '');
  }
  render();
}

function searchUserClick(event) {
  if (searchInput.value.length > 0) {
    searchUser(searchInput.value);
  } else {
    findersUsers = [];
    submitButton.setAttribute('disabled', '');
    return;
  }
  render();
}

function searchUser(filter) {
  findersUsers = [];
  findersUsers = userList.filter((user) => {
    return (
      user.name.first.toLowerCase().includes(filter) ||
      user.name.last.toLowerCase().includes(filter)
    );
  });
  render();
}

function render() {
  renderListUser();
  renderStatistics();
  renderTitles();
}

function renderListUser() {
  divUsers.innerHTML = '';
  findersUsers.forEach((user) => {
    divUsers.innerHTML += createUserInfoDiv(user);
  });
}

function renderStatistics() {
  divStatics.innerHTML = '';
  if (findersUsers.length > 0) {
    divStatics.innerHTML = generateStatistics();
  }
}

function generateStatistics() {
  var totalMens = findersUsers.reduce(
    (total, user) => (user.gender === 'male' ? (total += 1) : total),
    0
  );
  var totalWoman = findersUsers.length - totalMens;
  var totalAges = findersUsers.reduce((total, user) => (total += user.age), 0);
  var mediunAge = totalAges / findersUsers.length;
  return `
    <p> Sexo masculino: ${totalMens} </p>
    <p> Sexo feminino: ${totalWoman}</p>
    <p> Total de idades: ${totalAges} </p>
    <p> Media de idades: ${mediunAge}</p>
  `;
}

function renderTitles() {
  if (findersUsers.length > 0) {
    useTitle.textContent = `${findersUsers.length} usuário(s) encontrado(s)`;
    statisticsTitle.textContent = 'Estatisticas';
  } else {
    useTitle.textContent = `Nenhum usuário filtrado`;
    statisticsTitle.textContent = 'Nada a ser exibido';
  }
}

function createUserInfoDiv(user) {
  return `
    <div class="box app-background">
    <article class="media">
      <div class="media-left">
        <figure class="image is-32x32">
          <img class="is-rounded" src="${user.picture.thumbnail}" alt="Image">
        </figure>
      </div>
      <div class="media-content">
          <p>
            ${user.name.first} ${user.name.last}, ${user.age} anos
          </p>
      </div>
    </article>
  </div>
  `;
}

async function fetchUsers() {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const { results } = await response.json();
  userList = results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name,
      picture,
      age: dob.age,
      gender,
    };
  });
  render();
}
