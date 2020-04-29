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

app.post('/api/games', (req, res) => {

    wordArray = [];
    // request('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', { raw: true }, (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     //console.log(res);
    // });

    var randomWord = "hello";
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