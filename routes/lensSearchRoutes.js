const express = require('express');
const router = express.Router();
const newlensModels = require('../models/newlensModels'); 
const oldlensModels = require('../models/oldlensModels');
const DeviceInfo = require('../models/DeviceInfo');
const cumLensEntry = require('../models/cumLensEntry');

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

router.get('/customers/search/cumEP-lens', async (req, res) => {
  const { UPID } = req.query;

  try {
    // Get all documents for this UPID, sorted by newest first
    const cumEP = await cumLensEntry.find({ UPID }).sort({ _id: -1 });

    if (cumEP.length > 5) {
      // Slice to get the oldest entries beyond the first 5
      const idsToDelete = cumEP.slice(5).map(doc => doc._id);

      // Delete the extra (oldest) documents
      await cumLensEntry.deleteMany({ _id: { $in: idsToDelete } });

      console.log(`Deleted ${idsToDelete.length} old document(s).`);
    }

    // Return the latest up to 5 entries
    res.json(cumEP.slice(0, 5));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send(err);
  }
});

module.exports = router;