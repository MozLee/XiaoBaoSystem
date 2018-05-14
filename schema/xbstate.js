const mongoose = require('mongoose');

//建立微信用户schema
const xbstate = new mongoose.Schema({
    id:String,
    code:Number,
    state:String
})
module.exports = xbstate