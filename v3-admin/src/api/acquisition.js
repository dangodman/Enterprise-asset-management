import {post,get} from './index.js'

export function acquisitionList(){
  return get('/acquisitionList').then(res => res)
}

export function acquisitionAdd(body){
  return post('/addAcquisition',body).then(res => res)
}

export function acquisitionEdit(body){
  return post('/updateAcquisition',body).then(res => res)
}

export function acquisitionDelete(id){
  return post('/deleteAcquisition',id).then(res => res)
}