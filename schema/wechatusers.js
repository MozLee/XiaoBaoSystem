const mongoose = require('mongoose');

//建立微信用户schema
const WechatUser = new mongoose.Schema({
    name:String,//微信昵称
    alias:String,//备注昵称
    sex:Number,//性别 1男 0女
    province:String,//省
    city:String,//城市
    nowcity:String,//当前所在城市
    signature:String,//个性签名
    address:String,//地址
    star:Boolean,//星标好友
    stranger:Boolean,//陌生人
    avatar:String,//头像地址
    official:Boolean,//官方？？？？？
    special:Boolean,//特别关心???
    weatherService:Boolean
})
module.exports = WechatUser