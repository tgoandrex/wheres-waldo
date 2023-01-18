const mongoose = require('mongoose');

const scoreboardSchema = new mongoose.Schema({
    level: Number,
    username: String,
    time: Number
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = { Scoreboard };