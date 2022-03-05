require('dotenv').config();
const mongoose = require('mongoose');
const { VIRTUAL_PORT = 3000, MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const billa = require('./config/billa-hagenberg.json');
const hofer = require('./config/hofer-hagenberg.json');

const Location = require('./models/Location');

async function insertAll() {
    const billaa = [];
    Object.keys(billa).forEach(key => {
        billaa.push({
            name: key,
            items: billa[key],
        });
    });

    const hofera = [];
    Object.keys(hofer).forEach(key => {
        hofera.push({
            name: key,
            items: billa[key],
        });
    });

    const b = new Location({
        name: 'billa-hagenberg',
        aisles: billaa,
    });

    const h = new Location({
        name: 'hofer-hagenberg',
        aisles: hofera,
    });

    await b.save();
    await h.save();
}

insertAll().then(() => {
    console.log('done');
    process.exit();
});
