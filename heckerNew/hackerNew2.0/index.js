// 引入模块
const express = require('express');
const router = require('./router');

//创建服务器
const app = express(router);
//配置模板引擎
app.engine('html', require("express-art-template")); //告诉express 使用哪个模板
app.set('views', './pages'); //模板目录
//静态资源的托管
app.use('/assets', express.static('assets'));
//req.body 赋值
app.use(require('body-parser').urlencoded({ extended: false }));


//处理路由
app.use(router);


//设置端口
app.listen(9999, () => {
    console.log('http://localhost:9999 -------服务器已启动');
})