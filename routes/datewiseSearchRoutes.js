const express = require('express');
const router = express.Router();
const billingDate = require('../models/billingDateEntry');
// const ADMIN = require('../models/AuthenticationModels');

// Helper function to change the date format from yyyy-mm-dd to dd-mm-yyyy
const formatDate = (dateStr) => {
    const dateParts = dateStr.split('-'); // Split by dash (-)
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convert to dd-mm-yyyy
};

router.get('/customers/all', async (req, res) => {
    try {
        const { currentYear } = req.query;
        const conditions = [];
        const resultArr = [];


        currentYear && conditions.push({ billingDate: { $regex: new RegExp(currentYear, 'i') } });

        const query = conditions.length > 0 ? { $or: conditions } : {};

        await billingDate
            .find(query)
            .sort({ billingDate: 1 })
            .then(async (result) => {
                console.log(result);
                result.map(async (item) => {
                    if (!item.isRemoved) {
                        let totalAmount = 0;
                        // Sum the 'amount' of all products in the 'prodDetails' array
                        await item.prodDetails.forEach((prod) => {
                            totalAmount += prod.amount;
                        });
                        // Add the totalAmount to the item
                        item.totalAmount = await totalAmount;

                        // Format the billingDate
                        item.billingDate = formatDate(item.billingDate);

                        // // This is temp. just for FRAME
                        // if (item.L_S_input === "FRAME") {
                        //     resultArr.push(item);
                        //     console.log(resultArr[0].totalAmount);
                        // }

                        resultArr.push(item);

                    }
                });
            });

        res.json(resultArr);
        console.log(resultArr);

    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
