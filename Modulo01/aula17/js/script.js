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
  renderTabCountry();
  renderTabFavorites();
  renderCountrySumary();
  renderFavoriteSumary();
}

function renderTabCountry() {
  var divGlobal = document.createElement('div');
  allCountrys.forEach((country) => {
    var button = createButton(country.id);
    var div = createDiv();
    var img = document.createElement('img');
    var span = document.createElement('span');
    span.textContent = country.name;
    img.setAttribute('src', country.flag);
    div.appendChild(button);
    div.appendChild(img);
    div.appendChild(span);

    divGlobal.appendChild(div);
  });
  tabCountry.appendChild(divGlobal);
}

function renderCountrySumary() {
  countCountry.textContent = allCountrys.length;

  totalPopulationList.textContent = numberFormat.format(
    allCountrys.reduce((total, country) => country.population + total, 0)
  );
}

function renderTabFavorites() {}

function renderFavoriteSumary() {}

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

function createDiv() {
  var div = document.createElement('div');
  div.setAttribute('class', 'country');
  return div;
}

function createButton(id) {
  var button = document.createElement('a');
  button.setAttribute('class', 'waves-effect waves-light btn');
  button.setAttribute('id', id);
  button.textContent = '+';
  return button;
}
