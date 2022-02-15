const express = require('express');
const router = express.Router();
const fs = require('fs');

const Item = require('../../models/Item');

// LOCATION: /api/list

const locations = fs
    .readdirSync('config')
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));

router.get('/locations', async (req, res) => {
    res.json(locations);
});

router.get('/sorted/:location', async (req, res) => {
    const { location } = req.params;

    // Check if sorting rules are preset for the requested location
    if (!locations.includes(location)) {
        return res.status(404).json({ message: 'Not Found' });
    }

    const sortingRules = require(`../../config/${location}.json`);

    const items = await Item.find({});
    const categories = Object.keys(sortingRules);

    const sortedItems = {};

    items.forEach(item => {
        const { name, quantity } = item;
        const category = categories.find(category => sortingRules[category].includes(name));

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
