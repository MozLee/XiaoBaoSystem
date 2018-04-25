const mongoose = require('mongoose');
const adminSchema = require('../schema/admin');
module.exports = mongoose.model('Admin',adminSchema);