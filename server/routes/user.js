const router = require("koa-router")();
const jwt = require('../utils/jwt.js')
const  { fixedList }  = require('../controllers/mysqlControl.js');

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

router.get("/fixed", async (ctx) => {
  try {
    const result = await fixedList();
    console.log(result);
    if (result) {
      ctx.body = {
        code: "200",
        data: result,
      };
    } else {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "获取失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});



module.exports = router;
