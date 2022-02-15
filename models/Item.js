const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: String,
        required: false,
        trim: true,
    },
});

const itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
