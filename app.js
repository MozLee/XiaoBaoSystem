//引入express模块
const express = require('express');
const app = express();
const session = require('express-session')
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
console.log(__dirname)
app.use(express.static(__dirname+'/public'))
//引入跨域模块
const cors = require('cors');
//设置跨域
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

app.use(session({
  secret : 'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    maxAge : 1000 * 10 * 1, // 设置 session 的有效时间，单位毫秒
  },
}));

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