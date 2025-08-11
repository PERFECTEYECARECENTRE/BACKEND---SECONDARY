const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
  const deviceInfoSchema = new mongoose.Schema({
    dataID: { type: String },
    UPID: { type: String },
    name: { type: String },
    userAgent: { type: String },
    platform: { type: String },
    deviceType: { type: String },
    timezone: { type: String },
    city: { type: String },
    region: { type: String },
    country_name: { type: String },
    org: { type: String },
    createdDate: { type: String },
    createdTime: { type: String },
    createdBY: { type: String }
  });
  
module.exports = mongoose.model('DEVICE_INFO', deviceInfoSchema);