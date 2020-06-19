import React, { Component } from 'react';
import IncrementButton from '../IncrementButton';
import DecrementButton from '../DecrementButton';
import './styles.css';
export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      currentCounter: 0,
      steps: 0,
    };
  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;
    if (clickType === '-') {
      this.setState({ currentCounter: currentCounter - 1, steps: steps + 1 });
    } else {
      this.setState({ currentCounter: currentCounter + 1, steps: steps + 1 });
    }
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className="counterContainer">
        <DecrementButton onDecrement={this.handleButtonClick} />
        <span className="counterValue">{currentCounter}</span>
        <IncrementButton onIncrement={this.handleButtonClick} />
        <span className="counterValue">({steps})</span>
      </div>
    );
  }
}
