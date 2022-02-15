const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// LOCATION: /api/save

router.post('/', async (req, res) => {
    const { item, quantity } = req.body;

    console.log(`${quantity} of ${item}`);
});

module.exports = router;
