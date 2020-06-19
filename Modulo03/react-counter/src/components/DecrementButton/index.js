import React, { Component } from 'react';

export default class IncrementButton extends Component {
  handleClickButton = () => {
    this.props.onDecrement('-');
  };
  render() {
    return (
      <button
        onClick={this.handleClickButton}
        className="waves-effect waves-light btn red darken-4"
      >
        -
      </button>
    );
  }
}
