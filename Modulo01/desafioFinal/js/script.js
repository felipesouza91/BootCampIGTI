var searchInput = null;
var divStatics = null;
var divUsers = null;
var submitButton = null;
var useTitle = null;
var statisticsTitle = null; 
var findersUsers = [];
var userList = [
  {
    "name": {
      "title": "Ms",
      "first": "Ediane",
      "last": "Araújo"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/13.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/13.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/13.jpg"
    },
    "age": 66,
    "gender": "female"
  },
  {
    "name": {
      "title": "Ms",
      "first": "Nara",
      "last": "Porto"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/77.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/77.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/77.jpg"
    },
    "age": 70,
    "gender": "female"
  },
  {
    "name": {
      "title": "Mrs",
      "first": "Serafina",
      "last": "da Cruz"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/3.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/3.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    },
    "age": 66,
    "gender": "female"
  },
  {
    "name": {
      "title": "Mr",
      "first": "Eliseu",
      "last": "Castro"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/24.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/24.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/24.jpg"
    },
    "age": 48,
    "gender": "male"
  },
  {
    "name": {
      "title": "Miss",
      "first": "Luciara",
      "last": "Cavalcanti"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/3.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/3.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    },
    "age": 69,
    "gender": "female"
  },
  {
    "name": {
      "title": "Mr",
      "first": "Luciano",
      "last": "Nunes"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/men/86.jpg",
      "medium": "https://randomuser.me/api/portraits/med/men/86.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/86.jpg"
    },
    "age": 39,
    "gender": "male"
  },
  {
    "name": {
      "title": "Mrs",
      "first": "Gertrudes",
      "last": "Santos"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/25.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/25.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/25.jpg"
    },
    "age": 26,
    "gender": "female"
  },
  {
    "name": {
      "title": "Mrs",
      "first": "Anick",
      "last": "da Rocha"
    },
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/60.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
    },
    "age": 74,
    "gender": "female"
  },

]

window.addEventListener('load', () => {
  searchInput = document.querySelector("#inputFilter")
  submitButton = document.querySelector('#submitButton')
  divStatics = document.querySelector("#statics");
  divUsers = document.querySelector("#list");
  useTitle = document.querySelector("#finderTitle");
  statisticsTitle = document.querySelector("#statisticsTitle");
  searchInput.value = '';
  searchInput.addEventListener('keyup', searchUserEnter);
  submitButton.addEventListener('click', searchUserClick)
  fetchUsers();
})

function searchUserEnter(event) {
  if ( event.target.value.length > 0  ) {
    submitButton.removeAttribute('disabled')
    if ( event.key === 'Enter') {
      const filter = event.target.value.toLowerCase();
      searchUser(filter)
    }
  } else {
    findersUsers = [];
    submitButton.setAttribute('disabled', '')
  }
  render();
}

function searchUserClick(event) {
  if ( searchInput.value.length > 0  ) {
    searchUser(searchInput.value);
  } else {
    findersUsers = [];
    submitButton.setAttribute('disabled', '')
    return;
  }
  render();
}

function searchUser(filter) {
  findersUsers = [];
  findersUsers =  userList.filter( user => {
    return user.name.first.toLowerCase().includes(filter) || 
      user.name.last.toLowerCase().includes(filter);
  })
  render();
}

function render(){
  renderListUser();
  renderStatistics();
  renderTitles();
}

function renderListUser() {
  divUsers.innerHTML = '';
  findersUsers.forEach(user => {
    divUsers.innerHTML += createUserInfoDiv(user);
  })
}

function renderStatistics() {
  divStatics.innerHTML = '';
  if(findersUsers.length > 0 ) {
    divStatics.innerHTML = generateStatistics();
  }
}

function generateStatistics() {
  var totalMens = findersUsers.reduce((total, user) => 
    user.gender === 'male' ?  total += 1 : total
  , 0);
  var totalWoman = findersUsers.length - totalMens;
  var totalAges = findersUsers.reduce((total, user) => total += user.age, 0)
  var mediunAge = totalAges/ findersUsers.length;
  return `
    <p> Sexo masculino: ${totalMens} </p>
    <p> Sexo feminino: ${totalWoman}</p>
    <p> Total de idades: ${totalAges} </p>
    <p> Media de idades: ${mediunAge}</p>
  ` 
}

function renderTitles(){
  if(findersUsers.length > 0) {
    useTitle.textContent = `${findersUsers.length} usuário(s) encontrado(s)`;
    statisticsTitle.textContent = 'Estatisticas';
  } else {
    useTitle.textContent = `Nenhum usuário filtrado`;
    statisticsTitle.textContent = 'Nada a ser exibido';
  }
}

function createUserInfoDiv(user){
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
  `
}

async function fetchUsers() {
  const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const { results } = await response.json();
  userList = results.map( user => {
    const { name, picture, dob, gender } = user;
    return {
      name,
      picture,
      age: dob.age,
      gender
    }
  })
  render();
}