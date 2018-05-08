const mongoose = require('mongoose');
const userSchema = require('../schema/wechatusers');
module.exports = mongoose.model('User',userSchema,'users');