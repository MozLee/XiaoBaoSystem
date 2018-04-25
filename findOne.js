const mongoose = require ('mongoose');
require('./index.js');

let User = mongoose.model('User');

User.findOne({
    name:'LiXin'
},(err,doc) => {
    if(err){
        console.log(err);
        return
    }
    doc.name="YingMeiEr";
    doc.save();
    console.log(doc);
})