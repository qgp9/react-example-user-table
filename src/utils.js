import Chance from 'chance';

export function generateID(){
  let chance = new Chance();
  return chance.guid();
}


export function persistLoad(key, defaultDataGenerator){
  let localdata = localStorage.getItem(key);
  if( localdata !== 'undefined' && localdata !== null ){
    let obj = JSON.parse(localdata);
    if( obj!=null && typeof obj === 'object'){
      return obj;
    }
  }
  return defaultDataGenerator();
}
export function persistStore(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}
