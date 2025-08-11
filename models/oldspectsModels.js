const mongoose = require('mongoose');
const { type } = require('os');

//Data Schema
const eyePrescriptionSchema = new mongoose.Schema({
    eye: {type: String}, //Left/Right eye
    sphere: {type: String},
    cylinder: {type: String},
    axis: {type: String}
  });
  const entrySchema = new mongoose.Schema({
      prodUsed: { type: String, required: true },
      vendor: { type: String, required: true },
      amount: { type: Number, required: true },
    });
  const spectsSchemaOld = new mongoose.Schema({
    UPID: { type: String },
    serialNumber: { type: String, required: true }, 
    referenceNumber: { type: String }, //
    name: { type: String, required: true }, //
    address: { type: String }, //
    phone: { type: String }, //
    eyePrescription: [eyePrescriptionSchema], //
    addition: { type: String }, //
    // glass: { type: String }, //
    // vendor: { type: String }, //
    lastVisited: { type: String }, //
    prodDetails: [entrySchema],
    billingDate: { type: String, required: true },
    comment: { type: String},
    fav: { type: Boolean },
    database: { type: String, required: true },
    L_S_input: { type: String, required: true },
    Created: { type: Number, required: true }
  });


module.exports = mongoose.model('SPECTS_OLD', spectsSchemaOld);