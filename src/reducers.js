import { combineReducers } from 'redux';
import { ADD_USER, MODIFY_USER, DELETE_USER } from './actions';
import { generateID } from './utils';

function users(state={}, action){
  switch (action.type){
    case ADD_USER:
    {
      let newUser = { ...action.user };
      newUser.id = generateID();
      let newState = { ...state };
      newState[newUser.id] = newUser;
      return newState;
    }
    case MODIFY_USER:
    {
      let newState = { ...state };
      newState[action.user.id] = { ...action.user };
      return newState;
    }
    case DELETE_USER:
    {
      let newState = { ...state };
      delete newState[action.user.id];
      return newState;
    }
    default:
    return state;
  }
}

const usersInfo = combineReducers({
  users
});

export default usersInfo;
