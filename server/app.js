const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const userRouter = require('./routes/user.js')
const infoRouter = require('./routes/maintenanceInformation.js')


const app = new Koa();
app.use(cors());
app.use(bodyParser());

app.use(userRouter.routes(),userRouter.allowedMethods())
app.use(infoRouter.routes(),infoRouter.allowedMethods())

app.listen(3000, () => {
  console.log("项目运行在3000端口");
});
