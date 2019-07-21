const Router = require("koa-router");
const eventRouter = new Router();
const imgModel = require("../../data/imgModel.js");
const eventModel = require("../../data/eventModel.js");
eventRouter
  .get("/", async (ctx, next) => {
    const eventArray = await eventModel.find({});
    const post = {
      eventArray
    }
    await ctx.render('backstage/event/index',{
      post
    })
    await next();
  })
  .get("/zlq", async(ctx, next) => {
    const event = await eventModel.findOne({type: "zlq"});
    const imgArray = await imgModel.find({});
    const post = {
      event,
      imgArray
    }
    await ctx.render('backstage/event/zlq', {
      post
    })
    await next();
  })
  .get("/crc", async(ctx, next) => {
    const event = await eventModel.findOne({type: "crc"});
    const imgArray = await imgModel.find({});
    const post = {
      event,
      imgArray
    }
    await ctx.render('backstage/event/crc', {
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    let event = await eventModel.findOne({type: data.type});
    if(!event) {
      event = new eventModel({
        type: data.type,
        title: data.title,
        content: data.content
      })
      await event.save();
    }else{
      await eventModel.update({type: data.type}, {title: data.title, content: data.content})
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
module.exports = eventRouter;