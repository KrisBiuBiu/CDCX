const Router = require("koa-router");
const contactRouter = new Router();
const contactModel = require("../../data/contactModel.js");
contactRouter
  .get("/", async (ctx, next) => {
    const contactArray = await contactModel.find({});
    const post = {
      contactArray
    }
    await ctx.render('backstage/contact',{
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    const contact = new contactModel({
      position: data.position,
      name: data.name,
      mobile: data.mobile,
      email: data.email
    });
    await contact.save();
    ctx.body = {success: false, msg: '发布成功'};
    await next();
  })
  .post("/del", async (ctx, next) => {
    const data = ctx.request.body;
    const id = data.id;
    await contactModel.deleteOne({_id: id})
    ctx.body = {success: false, msg: '删除成功'};
    await next();
  })
module.exports = contactRouter;