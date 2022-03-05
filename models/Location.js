const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    aisles: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            items: [
                {
                    type: String,
                    trim: true,
                    lowercase: true,
                },
            ],
        },
    ],
});

const locationModel = mongoose.model('Location', locationSchema);

module.exports = locationModel;
