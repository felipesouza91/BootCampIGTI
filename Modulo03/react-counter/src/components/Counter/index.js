import React, { Component } from 'react';
import './styles.css';
export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    console.log('click');
    let count = this.state.count;
    count--;
    this.setState({ count });
  };

  render() {
    return (
      <div className="counterContainer">
        <button
          onClick={this.handleClick}
          className="waves-effect waves-light btn red darken-4"
        >
          -
        </button>
        <span className="counterValue">{this.state.count}</span>
        <button className="waves-effect waves-light btn green darken-4">
          +
        </button>
      </div>
    );
  }
}
