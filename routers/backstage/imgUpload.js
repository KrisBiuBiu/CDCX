const Router = require("koa-router");
const imgUploadRouter = new Router();
const fs = require("fs");
const imgModel = require("../../data/imgModel.js");
imgUploadRouter
  .get("/", async (ctx, next) => {
    const imgArray = await imgModel.find({});
    await ctx.render('backstage/imgUpload',{
      imgArray
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const file = ctx.request.body.files.file;
    if(!file) {
      ctx.body = {success: false, msg: '没有上传文件'};
    }
    const reader = fs.createReadStream(file.path);	// 创建可读流
    const ext = file.name.split('.').pop();		// 获取上传文件扩展名
    let newName = Math.random().toString();
    const upStream = fs.createWriteStream(`public/upload/${newName}.${ext}`);		// 创建可写流
    reader.pipe(upStream);	// 可读流通过管道写入可写流
    const img = new imgModel({
      id: newName,
      ext: ext
    });
    await img.save();
    
    return ctx.body = {id: newName, ext:ext};
    await next();
  })
module.exports = imgUploadRouter;