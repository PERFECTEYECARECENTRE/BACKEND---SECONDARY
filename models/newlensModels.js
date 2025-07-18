const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
const eyePrescriptionSchemaNew = new mongoose.Schema({
    eye: { type: String, required: true }, //Left/Right eye
    dia: { type: String, required: true},
    power: { type: String, required: true},
    curve: { type: String, required: true}
});
const entrySchema = new mongoose.Schema({
    prodUsed: { type: String, required: true },
    vendor: { type: String, required: true },
    amount: { type: Number, required: true },
  });
const lensSchemaNew = new mongoose.Schema({
    UPID: { type: String },
    name: { type: String, required: true },
    phone1: { type: Number, required: true},
    phone2: { type: Number },
    address: { type: String, required: true },
    eyePrescription: [eyePrescriptionSchemaNew],
    reffNum1: { type: String, required: true },
    reffNum2: { type: String },
    // lens: { type: String, required: true },
    // vendor: { type: String, required: true },
    // amt: { type: Number, required: true },
    prodDetails: [entrySchema],
    billingDate: { type: String, required: true },
    lastVisited: { type: String, required: true },
    comment: { type: String },
    database: { type: String, required: true },
    L_S_input: { type: String, required: true },
    Created: { type: Number, required: true }  //CREATED HERE IN SERVER ONLY
});


module.exports = mongoose.model('LENS_NEW', lensSchemaNew);