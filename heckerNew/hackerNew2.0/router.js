// 外置路由：
const experess = require('express');
const path = require('path');
const mongodb = require('mongodb');


//创建外置路由对象
const router = experess.Router();

// --------------------数据库------------------------
//数据库---客户端对象
const MongodbClient = mongodb.MongoClient;
// 连接数据库地址
const url = 'mongodb://127.0.0.1:27017';
// --------------------------------------------------

//注册路由
//首页
router.get('/', (req, res) => {
    // -----------------验证服务器是否正常----------------------------
    // res.sendFile(path.join(__dirname, 'pages', './index.html')); |
    // --------------------------------------------------------------

    // //连接数据库
    // MongodbClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    //     if (err) {
    //         return console.log('首页模块---连接数据库失败');
    //     }
    //     console.log("首页模块---连接数据库成功");
    //     //选择集合（数据库）
    //     let news = client.db('hk').collection('news');
    //     //操作集合（数据库）
    //     news.find().toArray((err, data) => {
    //         if (err) {
    //             console.log("首页模块---操作失败", err);
    //         }
    //         res.render('index.html', { list: data });
    //         console.log('首页模块---渲染完成');
    //         //关闭集合（数据库）
    //         client.close();
    //     })
    // });
    conDB((news, client) => {
        news.find().toArray((err, data) => {
            if (err) {
                console.log("首页模块---操作失败", err);
            }
            res.render('index.html', { list: data });
            console.log('首页模块---渲染完成');
            client.close();
        });

    });

});
//详情页面
router.get('/details', (req, res) => {
    let id = req.query.id; //不对应数据中的 objectID ,使用模板的时候要加上 toString();
    id = new mongodb.ObjectId(id) //需要使用 mongodb.ObjectId 转码
    console.log("选择了id：", id);
    conDB((news, client) => {
        news.find({ _id: id }).toArray((err, data) => {
            res.render('details.html', data[0]);
            console.log('详情页面---渲染完成');
            client.close();
        })
    })
});
// 提交页面
router.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'submit.html'));
});
//post提交数据
router.post('/add', (req, res) => {
    let info = req.body; //获取数据
    conDB((news, client) => {
        news.insertOne(info); //插入数据
        res.redirect('/') //重定向
    });
    MongodbClient.connect(url, (err, client) => {
        client.close();
    });
})






//导出
module.exports = router;

//链接数据库方法
let i = 0;

function conDB(callback) {
    MongodbClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            return console.log('首页模块---连接数据库失败');
        }
        console.log("连接数据库成功", i++, '次');
        //选择集合（数据库）
        let news = client.db('hk').collection('news');
        //操作集合（数据库）
        callback && callback(news, client);
    });
}