const mongoose = require('mongoose');

const Admin  = new mongoose.Schema({
    username:String,
    password:String
})
module.exports = Admin