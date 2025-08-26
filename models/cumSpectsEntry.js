const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
const eyePrescriptionSchemaNew = new mongoose.Schema({
    eye: { type: String }, //Left/Right eye
    sphere: { type: String },
    cylinder: { type: String },
    axis: { type: String }
});

const cumSpectsEntry = new mongoose.Schema({
    UPID: { type: String },
    eyePrescription: [eyePrescriptionSchemaNew],
    addition: { type: String},
    createdDate: { type: String },
    createdTime: { type: String }
});


module.exports = mongoose.model('CUM_SPECTS_ENTRY', cumSpectsEntry);