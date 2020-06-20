import React, { Component } from 'react';
import Countries from './components/Countries';
import Header from './components/Header';

import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: '',
      totoalPopulation: 0,
    };
  }

  async componentDidMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        name,
        id: numericCode,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });
    const totoalPopulation = this.totalPopulation(allCountries);
    this.setState({
      allCountries,
      filteredCountries: Object.assign([], allCountries),
      totoalPopulation,
    });
  }

  handleChangeFilter = (newFilter) => {
    const { allCountries } = this.state;
    this.setState({
      filter: newFilter,
    });
    const filterLoadCase = newFilter.toLowerCase();
    const filteredCountries = allCountries.filter((country) =>
      country.filterName.includes(filterLoadCase)
    );
    const totoalPopulation = this.totalPopulation(filteredCountries);
    this.setState({
      filteredCountries,
      totoalPopulation,
    });
  };

  totalPopulation = (filteredCountries) => {
    return filteredCountries.reduce(
      (total, country) => total + country.population,
      0
    );
  };

  render() {
    const { filteredCountries, totoalPopulation, filter } = this.state;
    return (
      <div className="container">
        <h1>React Countries</h1>
        <Header
          filter={filter}
          countryCounter={filteredCountries.length}
          totoalPopulation={totoalPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}
