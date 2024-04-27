import {post,get} from './index.js'

export function informationList(){
  return get('/repairList').then(res => res)
}

export function informationAdd(body){
  return post('/addRepair',body).then(res => res)
}

export function informationEdit(body){
  return post('/updateRepair',body).then(res => res)
}

export function informationDelete(id){
  return post('/deleteRepair',id).then(res => res)
}