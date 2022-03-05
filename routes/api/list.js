const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');
const Location = require('../../models/Location');

// LOCATION: /api/list

router.get('/locations', async (req, res) => {
    const locations = await Location.find({});
    res.json(locations.map(location => location.name));
});

router.get('/sorted/:location', async (req, res) => {
    const { location } = req.params;

    // Check if sorting rules are preset for the requested location
    const locationRules = await Location.findOne({ name: location }).exec();
    if (!locationRules) {
        return res.status(404).json({ message: 'Location not found!' });
    }
    const sortingRules = locationRules.aisles;

    const items = await Item.find({}).exec();
    const sortedItems = {};

    items.forEach(item => {
        const { name, quantity } = item;
        let category = sortingRules.find(aisle => aisle.items.includes(name));
        category = category?.name ? category.name : 'other';

        const itemString = `${quantity ? quantity + ' ' : ''}${capitalizeEveryWord(name)}`;

        sortedItems[category] ? sortedItems[category].push(itemString) : (sortedItems[category] = [itemString]);
    });

    // Delete all stored items from the database
    await Item.deleteMany({});

    return res.json(sortedItems);
});

function capitalizeEveryWord(string) {
    const words = string.split(' ');

    return words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);

        return firstLetter + restOfWord;
    });
}

module.exports = router;
