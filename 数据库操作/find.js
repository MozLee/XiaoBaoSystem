const mongoose = require ('mongoose');
require('./index.js');

let User = mongoose.model('User');
User.find({},(err,docs) => {
    if(err){
        console.log(err)
        return
    }
    console.log('resuilt:',docs);
});