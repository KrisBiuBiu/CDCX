const mainRouter = require('./routers');
const Koa = require('koa');
const path = require("path");
const app = new Koa();
const views = require('koa-views');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const koaBody = require('koa-body');
const mongoose = require("mongoose");

const staticPath = './public'
app.keys = ['this is my secret and fuck you all'];
app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 200*1024*1024*1024	// 设置上传文件大小最大限制，默认2M
  }
}));
mongoose.Promise = global.Promise;
const options = {
  promiseLibrary: Promise,
  autoIndex: true,
  poolSize: 50,
  keepAlive: 120,
  useNewUrlParser: true
};
mongoose.connect('mongodb://127.0.0.1:27017/chixiao', options);
app.use(static(
  path.join( __dirname,  staticPath)
))
// app.use(views('views', { map: {html: 'ejs' }}));
app.use(bodyparser())
app.use(views(path.join(__dirname, "./views"), {
  extension: "ejs"
}))
app
  .use(mainRouter.routes())

app.listen(5001);
console.log("server is ready")