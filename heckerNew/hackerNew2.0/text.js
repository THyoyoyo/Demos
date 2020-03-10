const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';

mongodbClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log('链接数据库失败');
    }
    //选择集合
    let news = client.db('hk').collection('news');
    // -------------------------

    news.deleteOne({ title: 'aac' }, function(err, result) {
        if (err) {
            console.log(404);
        }
    })









    news.find().toArray(function(err, data) {
        console.log(data);
    })
})