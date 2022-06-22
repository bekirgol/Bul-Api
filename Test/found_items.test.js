const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");

describe("Found Items Test", () => {
  let token;
  before((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send({ mail: "bekirgol@gmail.com", password: "bekir.1234" })
      .end((err, res) => {
        token = res.body.tokens.acces_token;
        done();
      });
  });

  describe("Found Items Test", () => {
    it("Get Found Items", (done) => {
      chai
        .request(server)
        .get("/founditems")
        .set({ "x-acces-token": token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
});
