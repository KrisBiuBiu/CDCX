const Router = require("koa-router");
const serviceRouter = new Router();
const imgModel = require("../../data/imgModel.js");
const serviceModel = require("../../data/serviceModel.js");
serviceRouter
  .get("/", async (ctx, next) => {
    const serviceArray = await serviceModel.find({});
    const post = {
      serviceArray
    }
    await ctx.render('backstage/service/index',{
      post
    })
    await next();
  })
  .get("/a", async(ctx, next) => {
    const a = await serviceModel.findOne({type: "a"});
    const imgArray = await imgModel.find({});
    const post = {
      a,
      imgArray
    }
    await ctx.render('backstage/service/a', {
      post
    })
    await next();
  })
  .get("/c", async(ctx, next) => {
    const c = await serviceModel.findOne({type: "c"});
    const imgArray = await imgModel.find({});
    const post = {
      c,
      imgArray
    }
    await ctx.render('backstage/service/c', {
      post
    })
    await next();
  })
  .get("/r", async(ctx, next) => {
    const r = await serviceModel.findOne({type: "r"});
    const imgArray = await imgModel.find({});
    const post = {
      r,
      imgArray
    }
    await ctx.render('backstage/service/r', {
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    let service = await serviceModel.findOne({type: data.type});
    if(!service) {
      service = new serviceModel({
        type: data.type,
        title: data.title,
        content: data.content
      })
      await service.save();
    }else{
      await serviceModel.update({type: data.type}, {title: data.title, content: data.content})
    }
    ctx.body = {success: false, msg: '发布成功'};
    await next();
  })
  .post("/del", async (ctx, next) => {
    const data = ctx.request.body;
    const id = data.id;
    await newsModel.deleteOne({_id: id})
    ctx.body = {success: false, msg: '删除成功'};
    await next();
  })
module.exports = serviceRouter;