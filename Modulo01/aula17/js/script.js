let tabCountry = null;
let tabFavorites = null;

let allCountrys = [];
let favoritesCountrys = [];

let countCountry = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountry = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountry = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationsList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationsFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');
  fetchCountries();
});

function render() {
  sortArrays();
  tabCountry.innerHTML = '';
  tabFavorites.innerHTML = '';
  renderTabCountry();
  renderTabFavorites();
  renderCountrySumary();
  renderFavoriteSumary();
}

function renderTabCountry() {
  var divGlobal = document.createElement('div');
  divGlobal.innerHTML = '';
  allCountrys.forEach((country) => {
    var div = createDiv(country);
    divGlobal.appendChild(div);
  });
  tabCountry.appendChild(divGlobal);
}

function renderTabFavorites() {
  var divGlobal = document.createElement('div');
  favoritesCountrys.forEach((country) => {
    var div = createDiv(country, false);
    divGlobal.appendChild(div);
  });
  tabFavorites.appendChild(divGlobal);
}

function renderCountrySumary() {
  countCountry.textContent = allCountrys.length;
  totalPopulationList.textContent = numberFormat.format(
    allCountrys.reduce((total, country) => country.population + total, 0)
  );
}

function renderFavoriteSumary() {
  countFavorites.textContent = favoritesCountrys.length;
  totalPopulationFavorites.textContent = numberFormat.format(
    favoritesCountrys.reduce((total, country) => country.population + total, 0)
  );
}

function createCountryInfo(name, population) {
  var div = document.createElement('div');
  var ul = document.createElement('ul');
  var liName = document.createElement('li');
  var liPopulation = document.createElement('li');
  liName.textContent = name;
  liPopulation.textContent = numberFormat.format(population);
  ul.appendChild(liName);
  ul.appendChild(liPopulation);
  div.appendChild(ul);
  return div;
}

function createDiv(country, isAdd = true) {
  var div = document.createElement('div');
  var button = createAddButton(country.id, isAdd);
  var img = document.createElement('img');
  var countryInfoUl = createCountryInfo(country.name, country.population);
  div.setAttribute('class', 'country');
  img.setAttribute('src', country.flag);
  img.setAttribute('alt', country.name);
  div.appendChild(button);
  div.appendChild(img);
  div.appendChild(countryInfoUl);
  return div;
}

function createAddButton(id, isAdd) {
  var button = document.createElement('a');
  button.setAttribute('id', id);
  if (isAdd) {
    button.setAttribute('class', 'waves-effect waves-light btn');
    button.addEventListener('click', addCountry);
    button.textContent = '+';
  } else {
    button.setAttribute('class', 'waves-effect waves-light btn red');
    button.addEventListener('click', removeCountry);
    button.textContent = '-';
  }
  return button;
}

function addCountry(event) {
  var id = event.target.id;
  var index = allCountrys.findIndex((country) => country.id === id);
  favoritesCountrys.push(allCountrys[index]);
  allCountrys.splice(index, 1);
  render();
}

function removeCountry(event) {
  var id = event.target.id;
  var index = favoritesCountrys.findIndex((country) => country.id === id);
  allCountrys.push(favoritesCountrys[index]);
  favoritesCountrys.splice(index, 1);
  render();
}

async function fetchCountries() {
  const listServer = await (
    await fetch('https://restcountries.eu/rest/v2/all')
  ).json();

  allCountrys = listServer.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });

  render();
}

function sortArrays() {
  allCountrys.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favoritesCountrys.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
