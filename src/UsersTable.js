import React from 'react';
import _ from 'underscore';
import FormSelect from './FormSelect';

// Constant for Sorting
const ASSC = -1;
const DESC = 1;

class User extends React.Component {
  defaultUser() { return {
    id:'',
    name:'',
    age: '',
    gender:'',
  };}
  constructor(props){
    super(props);
    this.state = {
      user:this.defaultUser()
    }
  }
  validationName(name){
    return typeof name === 'string' && name.length>0 && name.length<100;
  }
  validationAge(age){
    return age>=0;
  }
  validationGender(gender){
    return ["male","female"].includes(gender);
  }
  validation(user){
    return this.validationName(user.name) && this.validationAge(user.age) && this.validationGender(user.gender);
  }
  user(){
    return this.state.user;
  }
  addUser(){
    if( this.validation(this.state.user)){
      this.props.addUser(this.state.user);
    }else{
      alert('wrong format');
    }
  }
  deleteUser(){
    if(confirm("Are you sure want to remove this entry?")){
      this.props.deleteUser(this.props.user);
    }
  }
  modifyUser(){
    if( this.validation(this.state.user)){
      this.props.modifyUser(this.state.user);
    }else{
      alert('wrong format');
    }
  }
  clearUserState(){
    this.setState( { user:this.defaultUser() })
  }
  updateUserState(field,value){
    if( this.state.user[field] !== value ){
      let newUser = { ...this.state.user };
      newUser[field] = value;
      this.setState( { user:newUser })
    }
  }
  updateUserStateAll(user){
    this.setState( {user:{...user}});
  }
  rander(){
    return <div/>;
  }
}

class AddUser extends User {
  onChange(e){
    this.updateUserState(e.target.name, e.target.value);
  }
  render(){
    return (
      <div>
        <input type="text" placeholder="Name" name="name" value={this.state.user.name}
          onChange={this.onChange.bind(this)}
          ></input>
        <FormSelect name="age" placeholder='Age' value={this.user().age} options={_.range(0,100)}
          onChange={this.onChange.bind(this)}
          />
        <FormSelect name="gender" placeholder="Gender" value={this.user().gender} options={["male","female"]}
          onChange={this.onChange.bind(this)}
          />
        <button onClick={e=>{this.addUser() && this.clearUserState();}}>+</button>
      </div>
    );
  }
}

class UserRow extends User {
  constructor(props){
    super(props);
    this.state = { ...this.state,
      editMode: false,
    };
  }
  onChange(e){
    this.updateUserState(e.target.name, e.target.value);
  }
  // Event handler when click of Edit button
  // rewrite state of user from props
  onEdit(e){
    //this.props.reportOnEdit(this.props.user.id);
    this.updateUserStateAll(this.props.user);
    this.setState({editMode:true});
  }
  // cancel edit mode and clear user state.
  cancelEdit(){
    this.setState({editMode: false});
    this.clearUserState();
  }
  // Event handler when click of Done button
  // dispatch modified user information
  onEditDone(e){
    this.modifyUser();
    this.cancelEdit();
  }
  render(){
    let user = this.props.user;
    if( this.state.editMode ){
      return (
        <tr>
          <td>
            <input type="text" name="name" value={this.user().name}
              onChange={this.onChange.bind(this)}
              ></input>
          </td>
          <td>
            <FormSelect name="age" value={this.user().age} options={_.range(0,100)}
              onChange={this.onChange.bind(this)}
              />
          </td>
          <td>
            <FormSelect name="gender" value={this.user().gender} options={["male","female"]}
              onChange={this.onChange.bind(this)}
              />
          </td>
          <td>
            <button onClick={e=>this.onEditDone()}>Done</button>
            <button onClick={e=>this.deleteUser()}>Delete</button>
          </td>
        </tr>
      );
    }else{
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td>
            <button onClick={e=>this.onEdit()}>Edit</button>
            <button onClick={e=>this.deleteUser()}>Delete</button>
          </td>
        </tr>
      );
    }
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
        return <UserRow key={user.id}
          user={user}
          modifyUser={this.props.modifyUser}
          deleteUser={this.props.deleteUser}
          />;
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
