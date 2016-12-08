import React from 'react';
import _ from 'underscore';
import FormSelect from './FormSelect';

// Constant for Sorting
const ASSC = -1;
const DESC = 1;

class User extends React.Component {
  defaultUser: {
    id:'',
    name:'',
    age:0,
    gender:'',
  };
  constructor(props){
    super(props);
    this.state = {
      user:{...this.defaultUser}
    }
  }
  getUser(){
    return this.state.user;
  }
  addUser(){
    this.props.addUser(this.state.user);
  }
  clearUserState(){
    this.setState( { user:{...this.defaultUser} })
  }
  updateUserState(field,value){
    if( this.state.user[field] !== value ){
      let newUser = { ...this.state.user };
      newUser[field] = value;
      this.setState( { user:newUser })
    }
  }
}

class AddUser extends User {
  onChange(e){
    this.updateUserState(e.target.name, e.target.value);
  }
  render(){
    return (
      <div>
        <input type="text" name="name" placeholder="Name"
          onChange={this.onChange.bind(this)}
          ></input>
        <FormSelect name="age" placeholder="Age" options={_.range(0,100)}
          onChange={this.onChange.bind(this)}
          />
        <FormSelect name="gender" placeholder="Gender" options={["male","female"]}
          onChange={this.onChange.bind(this)}
          />
        <button onClick={e=>this.addUser()}>+</button>
      </div>
    );
  }
}

class UserRow extends User {
    render(){
      
    }
}

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page:0,             // current page
      sort_field: 'name',
      sort_direction: DESC,
    };
  }

  // channge sort field and flip direction
  handleSort(field){
    if(this.state.sort_field === field){
      let newDirection = this.state.sort_direction === ASSC ? DESC : ASSC;
      this.setState( {sort_direction: newDirection} );
    }else{
      this.setState( {sort_field: field, sort_direction:DESC} );
    }
  }
  // Change page
  changePage(page){
    // internal page number begins with 0
    this.setState({page: page-1});
  }
  // Rendering
  render() {
    let users = this.props.users;
    // pagenation variables
    let userPerPage = 20;
    let nuser = users.length;
    let npage = Math.ceil(nuser/userPerPage);
    let userBegin = (this.state.page)*userPerPage;
    // Sort variables and function
    let sort_field = this.state.sort_field;
    let sort_direction = this.state.sort_direction;
    let sort_func;
    if( this.state.sort_field === 'age'){
      sort_func = (a,b) => {
        return (a-b)*sort_direction;
      };
    }else{
      sort_func = (a,b) => {
        return a.localeCompare(b) * sort_direction;
      };
    }
    // Generate user rows with sorting, pagenation.
    const userItems = this.props.users.sort( (a,b) => {
      return sort_func(a[sort_field],b[sort_field])
    }).slice(userBegin, userBegin+20 ).map(
      (user) => {
        return <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>;
      }
    );
    const pagenation = _.range(1,npage).map( page => {
      return <button
        key={'page'+page}
        onClick={e=>this.changePage(page)}
        className={this.state.page === page ? 'current-page' : ''}
        >{page}
      </button>;
    });
    return (
      <div>
        <AddUser addUser={this.props.addUser}/>
        <table>
          <thead>
            <tr>
              <th onClick={()=>this.handleSort('name')}>Name</th>
              <th onClick={()=>this.handleSort('age')}>Age</th>
              <th onClick={()=>this.handleSort('gender')}>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userItems}
          </tbody>
        </table>
        <div>
          {pagenation}
        </div>
      </div>
    );
  }
}

export default UsersTable;
