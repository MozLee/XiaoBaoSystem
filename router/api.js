const express = require('express');
const router = express.Router();
const Admin = require('../model/admin');
const User = require('../model/user')
let resData, usersData;
router.use((req, res, next) => {
    resData = {
        code: -1,
        message: ''
    }
    usersData = {
        success: false,
        data: []
    }
    changeAdminPasswordData = {
        code: -1,
        message: ''
    }
    next();
})
router.get('/allusers', (req, res, next) => {
    if (req.session.username) {
        console.log(req.session.username)
        console.log(`可以请求数据`)
        User.find({}).then((result) => {
            // console.log(result);
            usersData.success = true;
            usersData.data = result;
            res.json(usersData)
        });
    } else {
        console.log(`无权限请求数据`);
        usersData.success = false;
        usersData.data = `无权限获取数据库，请重新登录`;
        res.json(usersData)
    }

})
//session登录
router.post('/sessionlogin', (req, res, next) => {
    if (req.session.username) {
        res.json({
            code: 0,
            message: 'session有效，可以登录',
            username:req.session.username
        })
    }
})
//管理员登出
router.post('/adminlogout', (req, res, next) => {
    console.log('管理员请求登出');
    req.session.destroy(function (err) {
        if (err) {
            res.json({
                ret_code: 2,
                ret_msg: '退出登录失败'
            });
            return;
        }
    });
    res.json({
        code: 0,
        message: '登出成功'
    })

})
//修改管理员密码
router.post('/changeadminpwd', (req, res, next) => {
    if (!req.session.username) {
        console.log('无权限修改密码');
        res.json('无权限修改密码');
        return
    }
    let adminName = req.body.adminName;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    Admin.findOne({
        username: adminName,
        password: oldPassword
    }).then((result) => {
        if (result) {
            result.password = newPassword;
            result.save();
            changeAdminPasswordData.code = 0;
            changeAdminPasswordData.message = '密码修改成功'
            res.json(changeAdminPasswordData)
            console.log('admin密码修改成功');
            return
        }
        changeAdminPasswordData.code = 1;
        changeAdminPasswordData.message = '密码修改失败，请检查旧密码是否正确'
        res.json(changeAdminPasswordData)
    })
})
//修改是否开启天气服务
router.post('/weatherservice', (req, res, next) => {
    if (!req.session.username) return
    let s = req.body.bl;
    let id = req.body.id;
    console.log(s, id)
    User.findOne({
        alias: id
    }, (err, doc) => {
        if (err) {
            console.log('Err', err)
            return
        }
        doc.weatherService = s;
        doc.save()
        console.log(`weatherservice更新成功`)
    })
    res.json('天气服务状态更新成功')
})
//处理admin登录请求
router.post('/admin', (req, res, next) => {
    console.log(`session` + req.session)
    let username = req.body.username;
    let password = req.body.password;
    if (!username || username == '') {
        resData.code = 1;
        resData.message = '请填写用户名';
        res.json(resData);
        return;
    }
    if (!password || password == '') {
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
        if (result) {
            resData.code = 0;
            resData.message = '登陆成功';
            resData.userInfo = {
                _id: result._id,
                username: result.username
            }
            // //发送cookie
            // res.cookie('userInfo',JSON.stringify({
            //     _id:result._id,
            //     username:result.username}))
            req.session.username = username;
            res.json(resData)
        } else {
            resData.code = 1;
            resData.message = '用户名密码错误';
            res.json(resData)
        }
    }).catch((e) => {
        console.log(e);
    })
})

module.exports = router;