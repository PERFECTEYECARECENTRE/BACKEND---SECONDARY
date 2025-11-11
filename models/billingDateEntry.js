const mongoose = require('mongoose');
const { type } = require('os');

const entrySchema = new mongoose.Schema({
    prodUsed: { type: String, required: true },
    vendor: { type: String, required: true },
    amount: { type: Number, required: true },
  });
const billingDateEntry = new mongoose.Schema({
    isRemoved: { type: Boolean, required: true },
    idInData: { type: String, required: true },
    UPID: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    phone1: { type: Number },
    phone2: { type: Number },
    address: { type: String, required: true },
    prodDetails: [entrySchema],
    billingDate: { type: String, required: true },
    database: { type: String, required: true },
    L_S_input: { type: String, required: true },
    Created: { type: Number, required: true }  //CREATED HERE IN SERVER ONLY
});


module.exports = mongoose.model('BILLING_DATE', billingDateEntry);