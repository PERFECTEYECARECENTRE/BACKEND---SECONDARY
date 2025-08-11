const express = require('express');
const router = express.Router();
const newspectsModels = require('../models/newspectsModels'); 
const oldspectsModels = require('../models/oldspectsModels');
const DeviceInfo = require('../models/DeviceInfo');

router.get('/customers/search/spects', async (req, res) => {
    try {
        const { id } = req.query;

        const itemN = await newspectsModels.findById(id);

        if (itemN) return res.status(200).json(itemN);

        const itemO = await oldspectsModels.findById(id);

        if (itemO) return res.status(200).json(itemO);

        return res.status(404).json({ message: 'Item not found' });

    } catch (error) {
        res.send(error);
    }
});

router.get('/customers/search/metadata-spects', async (req, res) => {
    const { dataID } = req.query;

try {
  const metadata = await DeviceInfo.find({dataID});
  if (metadata) {
    console.log('Document found:', metadata);
    res.json(metadata);
  } else {
    console.log('No document found with that ID.');
  }
} catch (err) {
  console.error('Error:', err);
  res.send(err);
}
});

module.exports = router;