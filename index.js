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
        res.status(500).send(error.details[0].message)
        return;
    }

    gamesDb.push(game);
    res.send(game);
});

app.patch('/api/games', (req, res) => {

    var guesses = req.body.guesses;
    var word = req.body.word;
    var lives = 3;
    var status = req.body.status;

    
    console.log(req.body)

    count = 0;
    guesses.forEach(guess => {
        if (!word.includes(guess)){
            lives--;
        } else {
            count++
        }
    })


    if (lives == 0) {
        status = 'lost'
    }

    if (count == word.length){
        status = 'won'
    }

    const game = {
        id: req.body.id,
        word: word,
        wordLength: req.body.wordLength,
        guesses: guesses,
        lives: lives,
        status: status
    };

    const { error } = Joi.validate(game, schema);
    if (error) {
        res.status(500).send(error.details[0].message)
        return;
    }

    gamesDb.push(game);
    res.send(game);
});



app.listen(3000);

module.exports = app;