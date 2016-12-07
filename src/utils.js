import chance from 'chance';

export function generateID(){
  return chance.guid();
}
