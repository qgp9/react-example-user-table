import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, modifyUser, deleteUser }  from './actions';
import UsersTable from './UsersTable'
import './App.css';

class App extends Component {
  // add, modify, delete user
  handleUser(action){
    this.props.dispatch(action);
  }
  //
  render() {
    const { dispatch, users } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <UsersTable
          users={users}
          addUser={user=>this.handleUser(addUser(user))}
          deleteUser={user=>this.handleUser(deleteUser(user))}
          modifyUser={user=>this.handleUser(modifyUser(user))}
          />
      </div>
    );
  }
}

// inject users by array
function select(state) {
  return {
    users: Object.values(state.users),
  }
}

export default connect(select)(App);
