const express = require('express');
const router = express.Router();

const Location = require('../../models/Location');

// LOCATION: /api/rules

router.post('/', async (req, res) => {
    const { name, location, aisle } = req.body;

    if (!name || !location || !aisle) {
        return res.status(400).json({ message: 'Missing parameters! (name + location + aisle required)' });
    }

    let loc = await Location.findOne({ name: location }).exec();
    if (!loc) {
        loc = new Location({ name: location });
        await loc.save();
    }

    // Check if the provided aisle already exisis in this location
    const a = loc.aisles.find(a => a.name === aisle);

    if (!a) {
        // Create a new aisle if it doesn't exist
        loc.aisles.push({ name: aisle, items: [name] });
    } else {
        // Add the item to the existing aisle
        a.items.push(name);
    }

    await loc.save();

    return res.json({ message: 'Rule added!' });
});

module.exports = router;
