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

//处理API相关
app.use('/api',require('./router/api'))
app.listen(3000)