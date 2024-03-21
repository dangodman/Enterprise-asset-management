const jwt = require('jsonwebtoken')

function sign(option){
  return jwt.sign(option,'666',{
    expiresIn:3000,
  })
}

const verify = () =>(ctx,next) => {
  let jwtToken = ctx.req.headers.authorization
  if(jwtToken){
    jwt.verify(jwtToken,'666',(err,decode) => {
      if(err){
        ctx.body = {
          code:401,
          msg:'token失效'
        }
      }else{
        next()
      }
    })
  }else{
    ctx.body = {
      code:401,
      msg:'请提供token'
    }
  }
}

module.exports = {
  sign,
  verify
}