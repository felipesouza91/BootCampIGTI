import React, { Component } from 'react';
import { formatNumber } from '../../helpers/format-helper';
import './style.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    this.props.onChangeFilter(event.target.value);
  };

  render() {
    const { filter, countryCounter, totoalPopulation } = this.props;
    return (
      <div className="flexRow">
        <input
          className="inputRow"
          type="text"
          value={filter}
          onChange={this.handleInputChange}
        />
        |{' '}
        <span>
          Paisses: <strong>{countryCounter}</strong>{' '}
        </span>
        |
        <span>
          População: <strong>{formatNumber(totoalPopulation)}</strong>
        </span>
      </div>
    );
  }
}
