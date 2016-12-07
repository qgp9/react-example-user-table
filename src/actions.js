export const ADD_USER = 'ADD_USER';
export const MODIFY_USER = 'MODIFY_USER';
export const DELETE_USER = 'DELETE_USER';

export const SET_PAGENATION_FILTER = 'SET_PAGENATION_FILTER';

export function addUser(user){
  return { type: ADD_USER, user }
}
export function modifyUser(user){
  return { type: MODIFY_USER, user }
}
export function deleteUser(user){
  return { type: DELETE_USER, user }
}
