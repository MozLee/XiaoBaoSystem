const express = require('express');
const router = express.Router();
const Admin = require('../model/admin');
const User = require('../model/user')
let resData,usersData;
router.use((req,res,next) => {
    resData={
        code:-1,
        message:''
    }
    usersData = {
      success:false,
      data:[]
    }
    next();
})
router.get('/allusers',(req,res,next) => {
    if(req.session.username){
      console.log(req.session.username)
      console.log(`可以请求数据`)
      User.find({}).then((result)=>{
      // console.log(result);
      usersData.success = true;
      usersData.data = result;
      res.json(usersData)
    });
    }else{
      console.log(`无权限请求数据`);
      usersData.success = false;
      usersData.data = `无权限获取数据库，请重新登录`;
      res.json(usersData)
    }
   
})
//处理admin登录请求
router.post('/admin',(req,res,next) => {
  console.log(`session`+req.session)
   let username = req.body.username;
   let password = req.body.password;
   if(!username||username==''){
       resData.code = 1;
       resData.message = '请填写用户名';
       res.json(resData);
       return;
   }
   if(!password||password==''){
       resData.code = 2;
       resData.message = '请输入密码';
       res.json(resData);
       return;
   }

   Admin.findOne({
       username,
       password
   }).then((result) => {
       console.log(result); 
       if(result){
        resData.code = 0;
        resData.message = '登陆成功';
        resData.userInfo = {
            _id:result._id,
            username:result.username
        }
        // //发送cookie
        // res.cookie('userInfo',JSON.stringify({
        //     _id:result._id,
        //     username:result.username}))
        req.session.username = username;
        res.json(resData)
       }else{
        resData.code = 1;
        resData.message = '用户名密码错误';
        res.json(resData)
       }   
   }).catch((e) => {
      console.log(e);
   })
})

module.exports = router;