// 引入模块
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser')


// 创建服务器
const app = express();

//配置整个项目的模板引擎
app.engine('html', require('express-art-template'));
app.set('views', './pages'); //配置模板路径
//静态资源托管
app.use('/assets', express.static('assets'));
//给 req.body 赋值
app.use(bodyParser.urlencoded({ extended: false }))

//处理路由
app.use(router);

//设置端口
app.listen(9999, () => {
    console.log('http://localhost:9999/index -------服务器已启动');
})