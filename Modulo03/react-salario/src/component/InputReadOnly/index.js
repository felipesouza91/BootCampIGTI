import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { labelText, value = 0, color } = this.props;
    return (
      <div className="input-field" style={{ width: '100%', margin: '5px' }}>
        <label>{labelText}</label>
        <input
          style={{ color, fontWeight: 'bold' }}
          placeholder="Digite seu salario"
          type="text"
          value={value}
          onChange={() => {}}
        />
      </div>
    );
  }
}
