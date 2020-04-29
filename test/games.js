var expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
var server = require('../index')
chai.use(chaiHttp);

describe("Games API", function () {
    describe("GET /ping", function () {
        it("Returns 200, ping", function (done) {
            chai.request('http://localhost:3000')
                .get('/ping')
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });

    describe("POST /games", function () {
        var url = "http://localhost:3000/api/games";

        it("Returns 200", function (done) {
            chai.request('http://localhost:3000')
                .post('/api/games')
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.contain(
                        {
                            lives: 3,
                            guesses: [],
                            status: 'active'
                        }
                    )
                    done();
                });
        });
    });
    describe("PATCH /games", function () {

        it("When one guess is wrong, lives - 1", function (done) {
            chai.request('http://localhost:3000')
                .patch('/api/games')
                .send(
                    {
                        "id": 1,
                        "word": "her",
                        "wordLength": 3,
                        "guesses": ["h", "e", "s"],
                        "lives": 3,
                        "status": "active"
                    }
                )
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.contain(
                        {

                            "id": 1,
                            "word": "her",
                            "wordLength": 3,
                            "lives": 2,
                            "status": "active"

                        }
                    )
                    done();
                });
        });

        it("When three guesses wrong, lives 0 and status: lost", function (done) {
            chai.request('http://localhost:3000')
                .patch('/api/games')
                .send(
                    {
                        "id": 1,
                        "word": "her",
                        "wordLength": 3,
                        "guesses": ["z", "x", "y"],
                        "lives": 3,
                        "status": "active"
                    }
                )
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.contain(
                        {

                            "id": 1,
                            "word": "her",
                            "wordLength": 3,
                            "lives": 0,
                            "status": "lost"
                        }
                    )
                    done();
                });
        });
        it("When all word letters have been guesses status : won", function (done) {
            chai.request('http://localhost:3000')
                .patch('/api/games')
                .send(
                    {
                        "id": 1,
                        "word": "her",
                        "wordLength": 3,
                        "guesses": ["h", "e", "r"],
                        "lives": 3,
                        "status": "active"
                    }
                )
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.contain(
                        {

                            "id": 1,
                            "word": "her",
                            "wordLength": 3,
                            "lives": 3,
                            "status": "won"
                        }
                    )
                    done();
                });
        });
        it("When all word letters have been guesses status : won", function (done) {
            chai.request('http://localhost:3000')
                .patch('/api/games')
                .send(
                    {
                        "id": 1,
                        "word": "her",
                        "wordLength": 3,
                        "guesses": ["h", "e", "r"],
                        "lives": 3,
                        "status": "active"
                    }
                )
                .end((err, res, body) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.contain(
                        {

                            "id": 1,
                            "word": "her",
                            "wordLength": 3,
                            "lives": 3,
                            "status": "won"
                        }
                    )
                    done();
                });
        });
    });
});