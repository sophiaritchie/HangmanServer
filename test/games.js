var expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Games API", function () {
    describe("GET /ping", function () {
        it("Returns 200, ping", function (done) {
            chai.request('http://localhost:3000')
            .get('/ping')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
});