const mongoose = require('mongoose');
const uri = 'mongodb://mozlee.xyz:20134/users';
mongoose.connect(uri);

let UsersSchema = new mongoose.Schema({
    name:String,
    sex:String,
    alias:String,
    age:Number  
})
mongoose.model('User',UsersSchema);