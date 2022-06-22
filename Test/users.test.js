const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../app");

chai.use(chaiHttp);

describe("User Test", () => {
  it("Login Test", (done) => {
    chai
      .request(server)
      .post("/users/login")
      .send({ mail: "bekirgol@gmail.com", password: "bekir.1234" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  //   it("Register Test", (done) => {
  //     chai
  //       .request(server)
  //       .post("/users/register")
  //       .send({
  //         mail: "testuser@test.com",
  //         password: "test.1234",
  //         name: "test",
  //         lastName: "test",
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done;
  //       });
  //   });
});
