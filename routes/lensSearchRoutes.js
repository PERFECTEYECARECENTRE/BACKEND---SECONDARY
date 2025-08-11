const express = require('express');
const router = express.Router();
const newlensModels = require('../models/newlensModels'); 
const oldlensModels = require('../models/oldlensModels');
const DeviceInfo = require('../models/DeviceInfo');

router.get('/customers/search/lens', async (req, res) => {
    try {
        const { id } = req.query;

        const itemN = await newlensModels.findById(id);

        if (itemN) return res.status(200).json(itemN);

        const itemO = await oldlensModels.findById(id);

        if (itemO) return res.status(200).json(itemO);

        return res.status(404).json({ message: 'Item not found' });

    } catch (error) {
        res.send(error);
    }
});

router.get('/customers/search/metadata-lens', async (req, res) => {
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