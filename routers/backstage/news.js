const Router = require("koa-router");
const newsRouter = new Router();
const fs = require("fs");
const imgModel = require("../../data/imgModel.js");
const newsModel = require("../../data/newsModel.js");
newsRouter
  .get("/", async (ctx, next) => {
    const imgArray = await imgModel.find({});
    const newsArray = await newsModel.find({});
    const post = {
      imgArray,
      newsArray
    }
    await ctx.render('backstage/news',{
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    const news = new newsModel({
      title: data.title,
      time: data.time,
      content: data.content,
      description: data.description,
      frame: data.frame
    });
    await news.save();
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
module.exports = newsRouter;