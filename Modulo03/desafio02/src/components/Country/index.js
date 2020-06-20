import React, { Component } from 'react';

import './styles.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    return (
      <div className="country-container">
        <img src={country.flag} alt={country.name} />
        <span>{country.name}</span>
      </div>
    );
  }
}
