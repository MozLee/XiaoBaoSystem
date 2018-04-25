const express = require('express');
const app = express();
//连接数据库
const mongoose = require('mongoose');
mongoose.connect(require('./keys/dburi'),(err) => {
    if(err){
        console.log('数据库连接失败'+err);
        return;
    }
    console.log('数据库连接成功');
});
//加载body-parser处理post数据
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
//处理API相关
//设置跨域
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/api',require('./router/api'))
app.listen(3000)