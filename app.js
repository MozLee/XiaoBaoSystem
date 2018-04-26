//引入express模块
const express = require('express');
const app = express();

//引入数据库模块
const mongoose = require('mongoose');
//连接数据库
mongoose.connect(require('./keys/dburi'),(err) => {
    if(err){
        console.log('数据库连接失败'+err);
        return;
    }
    console.log('数据库连接成功');
});

//引入跨域模块
const cors = require('cors');
//设置跨域
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

//引入cookies模块
const cookieParser = require('cookie-parser');
//设置cookies
app.use(cookieParser())

//加载body-parser处理post数据
const bodyParser = require('body-parser');
//设置bodyPasrser
app.use(bodyParser.urlencoded({extended:true}))

//处理API相关
app.use('/api',require('./router/api'))

let prot=3000;
app.listen(prot,() => {
    console.log('服务器开启成功,监听'+prot+'端口');
})