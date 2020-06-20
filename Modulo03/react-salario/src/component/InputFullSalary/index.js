import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleClick = (event) => {
    this.props.onSalaryInput(event.target.value);
  };

  render() {
    const { labelText, value = 0 } = this.props;
    return (
      <div className="input-field">
        <label htmlFor="full-salary">{labelText}</label>
        <input
          placeholder="Digite seu salario"
          type="number"
          id="full-salary"
          onChange={this.handleClick}
          defaultValue={value}
        />
      </div>
    );
  }
}
