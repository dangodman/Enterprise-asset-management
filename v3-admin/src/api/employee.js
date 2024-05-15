import {post,get} from './index.js'

export function employeesList(){
  return get('/employee').then(res => res)
}

export function employeesAdd(body){
  return post('/addEmployee',body).then(res => res)
}

export function employeesEdit(body){
  return post('/updateEmployee',body).then(res => res)
}

export function employeesDelete(id){
  return post('/deleteEmployee',id).then(res => res)
}