import React, { Component } from 'react';
import Counter from './components/Counter';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
export default class App extends Component {
  render() {
    return (
      <>
        <Counter />
        <Counter />
      </>
    );
  }
}
