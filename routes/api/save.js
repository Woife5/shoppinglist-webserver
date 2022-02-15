const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

// LOCATION: /api/save

router.post('/', async (req, res) => {
    const { item, quantity = null } = req.body;

    if (!item) {
        return res.status(400).json({ message: 'Missing item!' });
    }

    const newItem = Item({
        name: item,
        quantity,
    });
    await newItem.save();

    return res.json({ message: 'Item inserted!' });
});

module.exports = router;
