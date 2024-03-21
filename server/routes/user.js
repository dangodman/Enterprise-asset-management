const router = require("koa-router")();
const jwt = require('../utils/jwt.js')

router.post("/login", (ctx) => {
  let user = ctx.request.body; // 获取到前端传过来的参数
  console.log(user);
  if (1) {
    let jwtToken = jwt.sign({id:'1',username:user.username,admin:true})
    console.log(jwtToken);
    ctx.body = {
      code:0,
      data:{
        msg:'登录成功',
      },
      token: jwtToken
    }
  }else {
    ctx.body = {
      code:1,
      data:{
        msg:'账号或密码错误',
      }
    }
  }
});


module.exports = router;
