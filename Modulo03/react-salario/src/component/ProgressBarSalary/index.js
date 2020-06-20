import React, { Component } from 'react';

// import { Container } from './styles';

export default class ProgressBarSalary extends Component {
  render() {
    const { value, color = 'black' } = this.props;

    return (
      <div
        style={{
          marginTop: '40px',
          width: value + '%',
          height: '20px',
          backgroundColor: color,
        }}
      />
    );
  }
}
