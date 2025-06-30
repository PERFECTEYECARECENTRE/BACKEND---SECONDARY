const express = require('express');
const router = express.Router();
const newlensModels = require('../models/newlensModels'); 
const oldlensModels = require('../models/oldlensModels');

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

module.exports = router;