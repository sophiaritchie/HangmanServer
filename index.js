var express = require("express");
var app = express();
const Joi = require('joi');
var request = require("request");
var fs = require("fs");

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('ping');
});

var gamesDb = [
]

const schema = {
    id: Joi.number().required(),
    word: Joi.string().min(3).required(),
    wordLength: Joi.number().required(),
    guesses: Joi.array().required(),
    lives: Joi.number().required(),
    status: Joi.string().valid('active', 'won', 'lost')
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

app.post('/api/games', (req, res) => {

    var wordArray = fs.readFileSync('words_alpha.txt').toString().split("\r\n");

    var randomWord = wordArray[getRandomInt(wordArray.length)];
    const generatedId = 1

    const game = {
        id: generatedId,
        word: randomWord,
        wordLength: randomWord.length,
        guesses: [],
        lives: 3,
        status: 'active'
    };

    const { error } = Joi.validate(game, schema);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    gamesDb.push(game);
    res.send(game);
});


app.listen(3000);

module.exports = app;