import {post,get} from './index.js'

export function changesList(){
  return get('/changeList').then(res => res)
}

export function changesAdd(body){
  return post('/addChanges',body).then(res => res)
}

export function changesEdit(body){
  return post('/updateChanges',body).then(res => res)
}

export function changesDelete(id){
  return post('/deleteChanges',id).then(res => res)
}