var expect = require("chai").expect;
var request = require("request");


describe("Games API", function () {
    describe("GET /ping", function () {
        var url = "http://localhost:3000/ping";

        it("Returns 200, ping", function (done) {
            request(url, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body).to.equal('ping');
                done();
            });
        });
    });
});