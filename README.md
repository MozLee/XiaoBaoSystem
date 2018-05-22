# 小宝管理系统后端

## 关于小宝管理系统
小宝管理系统采用前后端分离，小宝管理系统后端提供相关API，小宝管理系统前端负责渲染数据。
## 版本更新
2018.5.18----VER 1.0.0 beta

 1. 完成基本功能。
 2. 为小宝系统提供基本功能的API。

## 提供的API

### 管理员信息
|API| 描述 |方法|参数|返回| 
| - | - | - | - | - | 
|/admin|登录|POST| username(String),password(String) | Object | 
| /changeadminpwd|修改密码| POST| adminName(String),oldPassword(String),newPasswrod(String) | Object | 
| /adminlogout|登出|POST|  | Object | 

### 用户信息

|API| 描述 |方法|参数|返回| 
| - | - | - | - | - | 
| /allusers| 获取所有用户 | GET |  | Object | 

### 天气服务

|API| 描述 |方法|参数|返回| 
| - | - | - | - | - | 
| /weathertime| 获取天气推送时间 | GET |  | Object | 
| /setweathertime| 获取天气推送时间 | GET |time(String[00:00])| Object | 
| /weatherservice| 开启关闭天气服务 | POST |bl(Boolean),id(String)| Object | 

### 从小宝ROBOT更新数据
|API| 描述 |方法|参数|返回| 
| - | - | - | - | - | 
| /updateall| 从Wechat更新最新的数据到小宝数据库 | GET |  | Object |

## 遇到问题&解决方案
**问题1** 前端请求数据的跨域问题。

- [x] 在后端设置允许跨域。
```
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

**问题2** 设置跨域后,前端发送POST请求，后端接收不到数据。

- [x] 前端使用axios发送ajax请求时，需要使用qs包格式一下POST的参数。

**问题3** 无法成功设置登录状态Cookie

- [x] 需要再添加一条 Access-Control-Allow-Credentials:true
表示允许跨域携带cookie，
并且要将Access-Control-Allow-Origin指定到具体的域，否则cookie不会带到客户端。
感觉这样设置麻烦。。。。。
于是在npm发现了一个专门跨域的包 cors.

```
const cors = require('cors')
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
```
- [x] 由于前端我用axios发送的ajax请求，所以还要设置下axios
withCredentials: true
允许携带凭证
这样就ok拉~

**其他**问题我将会在[博客][1]中进行总结

  [1]: http://blog.mozlee.com/2018/04/26/%E5%B0%8F%E5%AE%9D%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F%E7%88%AC%E5%9D%91%E8%AE%B0%E5%BD%95/