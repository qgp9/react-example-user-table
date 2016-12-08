import chance from 'chance';

export function generateID(){
  return chance.guid();
}


export function persistLoad(key, defaultDataGenerator){
  let localdata = localStorage.getItem(key);
  if( localdata === 'undefined' || localdata === null ){
    return defaultDataGenerator();
  }else{
    return JSON.parse(localdata);
  }
}
export function persistStore(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}
