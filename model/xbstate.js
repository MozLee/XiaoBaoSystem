const mongoose = require('mongoose');
const xbState = require('../schema/xbstate');
module.exports = mongoose.model('XbState',xbState,'xbstate');