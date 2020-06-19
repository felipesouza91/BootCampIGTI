import React, { Component } from 'react';
import Counter from './components/Counter';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import Users from './components/Users';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    console.log('Did Mout');
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&result=10'
    );
    const json = await res.json();
    this.setState({
      users: json.results,
    });
  }

  componentDidUpdate() {
    console.log('Did Update');
  }

  handleShowUsers = (event) => {
    this.setState({
      showUsers: event.target.checked,
    });
  };

  render() {
    const { showUsers, users } = this.state;
    return (
      <>
        <div className="switch">
          <label>
            Mostar usuarios:
            <input type="checkbox" onChange={this.handleShowUsers} />
            <span className="lever"></span>
          </label>
        </div>
        {showUsers && (
          <div>
            <Users users={users} />
          </div>
        )}
        <hr />
        <br />
        <Counter />
        <Counter />
      </>
    );
  }
}
