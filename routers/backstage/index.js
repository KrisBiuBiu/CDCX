const Router = require('koa-router');
const router = new Router();
const imgUploadRouter = require("./imgUpload");
const newsRouter = require("./news");
const contactRouter = require("./contact");
const serviceRouter = require("./service");
const eventRouter = require("./event");
const dayRouter = require("./day");
const homeRouter = require("./home");
router
  .use("/", async (ctx, next) => {
    if(!ctx.session.user) {
      ctx.response.redirect('/login');
    }
    await next();
  })
  .get("/", async (ctx, next) => {
    let title = "后台"
    await ctx.render('backstage/index', {
      title,
    })
    await next();
  })
	.use('/imgUpload', imgUploadRouter.routes(), imgUploadRouter.allowedMethods())
	.use('/news', newsRouter.routes(), newsRouter.allowedMethods())
	.use('/contact', contactRouter.routes(), contactRouter.allowedMethods())
	.use('/service', serviceRouter.routes(), serviceRouter.allowedMethods())
	.use('/event', eventRouter.routes(), eventRouter.allowedMethods())
	.use('/day', dayRouter.routes(), dayRouter.allowedMethods())
	.use('/home', homeRouter.routes(), homeRouter.allowedMethods())
module.exports = router;
