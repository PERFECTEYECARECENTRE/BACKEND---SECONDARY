const express = require('express');
const router = express.Router();
const newspectsModels = require('../models/newspectsModels'); 
const oldspectsModels = require('../models/oldspectsModels');

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

module.exports = router;