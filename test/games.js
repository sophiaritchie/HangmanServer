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
                    console.log(res.body)
                    expect(res.body).to.contain(
                        {
                            wordLength: 5,
                            lives: 3,
                            guesses: [],
                            status: 'active'
                        }
                    )
                    done();
                });
        });
    });
});