// 引入模块
const express = require('express');
const path = require('path');
const fs = require('fs');

// 创建外置路由对象
const router = express.Router();

// 注册路由
router.get('/index', (req, res) => { // index 首页
    readData((data) => {
        data.list.sort((a, b) => b.id - a.id)
        res.render('index.html', data)
    });
});
router.get('/', (req, res) => { //首页
    res.redirect('/index') //重定向：跳转到首页
});
router.get('/details', (req, res) => { //详情
    // 获取前端传递过来的id
    let id = req.query.id;
    //从data中查找id渲染
    readData(data => {
        let info = data.list.find(v => v.id = id)
        res.render('details.html', info)
    })
})
router.get('/submit', (req, res) => { //提交页面
    res.sendFile(path.join(__dirname, 'pages', './submit.html'));
});
router.post('/add', (req, res) => { // post提交数据
    let info = req.body;
    readData(data => {
        info.id = data.list[data.list.length - 1].id + 1;
        data.list.push(info);
        data = JSON.stringify(data, null, 4);
        writeData(data, () => {
            res.redirect('/')
        })
    })
});



//导出路由模块
module.exports = router;





//封装读取文件，方法
function readData(callback) {
    fs.readFile(path.join(__dirname, 'data', './data.json'), 'utf-8', (err, data) => {
        if (err) {
            return console.log('首页读取失败');
        };
        data = JSON.parse(data); //数据转成对象
        callback && callback(data)
    });
}

// 写入数据
function writeData(data, callback) {
    fs.writeFile(path.join(__dirname, 'data', './data.json'), data, 'utf-8', (err) => {
        if (err) {
            return console.log('写入失败');
        }
        callback && callback(data)
    })
}