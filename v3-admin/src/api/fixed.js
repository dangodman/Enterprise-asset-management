import {post,get} from './index.js'


export function fixedList(){
  return get('/fixed').then(res => res)
}