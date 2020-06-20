import React, { Component } from 'react';
import Country from '../Country';
import './styles.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div className="countries-container">
        {countries.map((country) => (
          <Country key={country.id} country={country} />
        ))}
      </div>
    );
  }
}
