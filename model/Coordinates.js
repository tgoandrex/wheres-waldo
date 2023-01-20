const mongoose = require('mongoose');

const coordinatesSchema = new mongoose.Schema({
    level: Number,
    x_coord: Number,
    y_coord: Number
});

const Coordinates = mongoose.model('Coordinates', coordinatesSchema);

module.exports = { Coordinates };