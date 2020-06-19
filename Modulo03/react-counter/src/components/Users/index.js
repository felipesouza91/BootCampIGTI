import React, { Component } from 'react';

// import { Container } from './styles';

export default class Users extends Component {
  render() {
    const { users } = this.props;

    return (
      <div>
        {users.map((user) => {
          const { login, name, picture } = user;
          return <p key={user.login.uuid}>{user.name.first}</p>;
        })}
      </div>
    );
  }
}
