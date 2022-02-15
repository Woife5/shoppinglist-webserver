const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { VIRTUAL_PORT = 3000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Item = require('./models/Item');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// save API router
const saveApi = require('./routes/api/save');
app.use('/api/save', saveApi);

// get list API router
const listApi = require('./routes/api/list');
app.use('/api/list', listApi);

/** -------------------- Handle all other requests with 404, not found -------------------- */
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(VIRTUAL_PORT, () => {
    console.log(`listening on ${VIRTUAL_PORT}`);
});
