import _ from 'underscore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser, modifyUser, deleteUser }  from './actions';
import UsersTable from './UsersTable'
import './App.css';
import logo from './logo-nord.svg';
class App extends Component {
  // add, modify, delete user
  handleUser(action){
    this.props.dispatch(action);
  }
  //
  render() {
    const { users } = this.props;
    return (
      <div className="App">
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="logo"><a href="#"><img src={logo} alt="logo"></img></a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="small-9 small-centered columns">
            <UsersTable
              users={users}
              addUser={user=>this.handleUser(addUser(user))}
              deleteUser={user=>this.handleUser(deleteUser(user))}
              modifyUser={user=>this.handleUser(modifyUser(user))}
              />
          </div>
        </div>
      </div>
    );
  }
}

// inject users by array
function select(state) {
  return {
    users: _.values(state.users),
  }
}

export default connect(select)(App);
