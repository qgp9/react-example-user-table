import Chance from 'chance';

let generateUserInfo = function(){
  let chance = new Chance();
  let users = {};
  for( let i=0; i<100;i++){
    let id = '';
    do {
      id = chance.guid();
    } while( id in users );
    users[id] = {
      id:   id,
      name: chance.name(),
      age:  chance.age(),
      gender: chance.gender().toLowerCase()
    }
  }
  console.log(users);
  return users;
}

export default generateUserInfo;
