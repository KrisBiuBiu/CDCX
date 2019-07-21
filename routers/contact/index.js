const Router = require('koa-router');
const router = new Router();
const contactModel = require("../../data/contactModel.js");
router
  .use("/", async (ctx, next) => {
    await next();
  })
  .get("/", async (ctx, next) => {
    const contactArray = await contactModel.find({});
    const post = {
      contactArray
    }
    await ctx.render('contact', {
      post,
    })
    await next();
  });
module.exports = router;
