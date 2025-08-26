const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
const eyePrescriptionSchemaNew = new mongoose.Schema({
    eye: { type: String }, //Left/Right eye
    dia: { type: String },
    power: { type: String },
    curve: { type: String }
});

const cumLensEntry = new mongoose.Schema({
    UPID: { type: String },
    eyePrescription: [eyePrescriptionSchemaNew],
    createdDate: { type: String },
    createdTime: { type: String }
});


module.exports = mongoose.model('CUM_LENS_ENTRY', cumLensEntry);