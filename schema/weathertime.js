const mongoose = require('mongoose');

//建立微信用户schema
const weatherTime = new mongoose.Schema({
    id:String,
    time:String,
})
module.exports = weatherTime