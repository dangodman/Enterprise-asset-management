import {post,get} from './index.js'

export function login(body){
  return post('/login',body).then(res => res)
}


export function fixedList(){
  return get('/fixed').then(res => res)
}

