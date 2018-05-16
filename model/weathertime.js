const mongoose = require('mongoose');
const weatherTime = require('../schema/weathertime');
module.exports = mongoose.model('weatherTime',weatherTime,'weathertime');