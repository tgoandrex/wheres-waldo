require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectionString = process.env.ATLAS_URI;
const port = process.env.PORT || 4000;

const { Scoreboard } = require('./model/Scoreboard');
const { Coordinates } = require('./model/Coordinates');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Get top 10 fastest scoreboard times from specific level
app.get('/scoreboard/:level', async (req, res) => {
  try {
    const levelSpecificScoreboards = await Scoreboard.find({level: req.params.level}).sort({time: 1}).limit(10);
    return res.status(200).json(levelSpecificScoreboards);
  } catch(e) {
    console.error(e);
  }
});

// Create a new scoreboard for a specific level
app.post('/scoreboard/:level', (req, res) => {
  const scoreboard = new Scoreboard({
    level: req.params.level,
    username: req.body.username,
    time: req.body.time
  });

  try {
    scoreboard.save();
  } catch(e) {
    console.error(e);
  }
});

// Get waldo's coordinates from specific level
app.get('/coordinates/:level', async (req, res) => {
  try {
    const levelCoordinates = await Coordinates.findOne({level: req.params.level});
    return res.status(200).json(levelCoordinates);
  } catch(e) {
    console.error(e);
  }
});

if(process.env.NODE_ENV !== 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
}

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      connectionString
    );
    app.listen(port, () => console.log(`Where's Waldo app listening on port ${port}`));
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};

start();