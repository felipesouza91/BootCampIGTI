import React, { Component } from 'react';
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        name,
        id: numericCode,
        flag,
        population,
      };
    });
    this.setState({
      allCountries,
    });
  }

  render() {
    const { allCountries } = this.state;
    return (
      <div className="container">
        <h1>React Countries</h1>
      </div>
    );
  }
}
