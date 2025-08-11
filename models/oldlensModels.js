const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
const eyePrescriptionSchema = new mongoose.Schema({
    eye: {type: String}, //Left/Right eye
    dia: {type: String},
    power: {type: String},
    curve: {type: String}
  });
  const entrySchema = new mongoose.Schema({
      prodUsed: { type: String, required: true },
      vendor: { type: String, required: true },
      amount: { type: Number, required: true },
    });

  const lensSchemaOld = new mongoose.Schema({
    UPID: { type: String },
    tempCreated: { type: String },
    name: { type: String, required: true },
    address: { type: String },
    eyePrescription: [eyePrescriptionSchema],
    // lens: { type: String },
    phone: { type: String },
    lastVisited: { type: String },
    referenceNumber: { type: String },
    // vendor: { type: String },
    // amt: { type: String },
    prodDetails: [entrySchema],
    billingDate: { type: String, required: true },
    comment: { type: String},
    fav: { type: Boolean },
    database: { type: String, required: true },
    L_S_input: { type: String, required: true },
    Created: { type: Number, required: true }
  });
  
module.exports = mongoose.model('LENS_OLD', lensSchemaOld);