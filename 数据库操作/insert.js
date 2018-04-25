const mongoose = require ('mongoose');
require('./index.js');

let User = mongoose.model('User');

let lixin = new User({
    name:"LiXin",
    sex:'男',
    alias:'LiLei',
    age:19  
})

lixin.save((err) => {
   console.log('保存状态',err?'失败':'成功');
})