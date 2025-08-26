const express = require('express');
const router = express.Router();
const newspectsModels = require('../models/newspectsModels'); 
const oldspectsModels = require('../models/oldspectsModels');
const DeviceInfo = require('../models/DeviceInfo');
const cumSpectsEntry = require('../models/cumSpectsEntry');

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

// router.get('/customers/search/cumEP-spects', async (req, res) => {
//     const { UPID } = req.query;

// try {
//   const cumEP = await cumSpectsEntry.find({UPID}).sort({_id: -1});
//   if (cumEP) {
//     console.log('Document found:', cumEP);
//     res.json(cumEP);
//   } else {
//     console.log('No document found with that ID.');
//   }
// } catch (err) {
//   console.error('Error:', err);
//   res.send(err);
// }
// });

router.get('/customers/search/cumEP-spects', async (req, res) => {
  const { UPID } = req.query;

  try {
    // Get all documents for this UPID, sorted by newest first
    const cumEP = await cumSpectsEntry.find({ UPID }).sort({ _id: -1 });

    if (cumEP.length > 5) {
      // Slice to get the oldest entries beyond the first 5
      const idsToDelete = cumEP.slice(5).map(doc => doc._id);

      // Delete the extra (oldest) documents
      await cumSpectsEntry.deleteMany({ _id: { $in: idsToDelete } });

      console.log(`Deleted ${idsToDelete.length} old document(s).`);
    }

    // Return the latest up to 5 entries
    res.json(cumEP.slice(0, 5));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send(err);
  }
});



// router.get('/customers/search/cumEP-spects', async (req, res) => {
//   const { UPID } = req.query;

//   try {
//     const cumEP = await cumSpectsEntry.find({ UPID });

//     if (cumEP && cumEP.length > 0) {
//       // Combine date and time into a JS Date object for sorting
//       const sorted = cumEP.sort((a, b) => {
//         const dateA = new Date(`${a.createdDate} ${a.createdTime}`);
//         const dateB = new Date(`${b.createdDate} ${b.createdTime}`);
//         return dateB - dateA; // Newest first
//       });

//       console.log('Sorted documents:', sorted);
//       res.json(sorted);
//     } else {
//       console.log('No document found with that ID.');
//       res.json([]);
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).send(err);
//   }
// });

module.exports = router;