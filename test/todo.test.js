import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../src/index.js";

chai.use(chaiHttp);
const expect = chai.expect;
let todoId;

let token;

describe("POST /api/signup", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/api/signup")
      .send({
        name:"Nosenti",
        email: "innocent@gmail.com",
        password: "123456",
        confirmPassword: "123456"
      })
      .end((error, response) => {
        expect(response).to.have.status(201);
        token = response.body.token;
        done();
      });
  });
});

describe("POST /api/login", () => {
  it("should return 200 - LOGIN", (done) => {
    chai
      .request(app)
      .post("/api/signin")
      .send({
        email: "innocent@gmail.com",
        password: "123456",
      })
      .end((error, response) => {
        expect(response).to.have.status(200);
        token = response.body.token;
        done();
      });
  });
});

describe("TODO", () => {

  describe("TODO", () => {
      it("should return 201 - create todo", (done) => {
        chai
          .request(app)
          .post("/api/todos")
          .set("token", `${token}`)
          .send({
            title: "My Todo",
            description: "I had been here before",
            priority:'LOW'
          })
          .end((error, response) => {
            // expect(error).to.be.null;
            expect(response).to.have.status(201);
            todoId = response.body.todo._id;
            done();
          });
      });
      it("should not create a todo", (done) => {
        chai
          .request(app)
          .post("/api/todos")
          .set("token", `${token}`)
          .send({
            title: "",
            description: "",
            priority:"LOW"
          })
          .end((error, response) => {
            // expect(error).to.be.null;
            expect(response).to.have.status(400);
            done();
          });
      });

      it("should get one todo by Id", (done) => {
        chai
          .request(app)
          .get(`/api/todos/${todoId}`)
          .set("token", `${token}`)
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe("UPDATE /api/todos/:id", () => {
      it("should update and return 200", (done) => {
        chai
          .request(app)
          .put(`/api/todos/${todoId}`)
          .set("token", `${token}`)
          .send({
            title: "updated todo",
            description: "This is the updated todo",
          })
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

    describe("DELETE /api/todos/:id", () => {
      it("should return 200", (done) => {
        chai
          .request(app)
          .delete(`/api/todos/${todoId}`)
          .set("token", `${token}`)
          .end((error, response) => {
            expect(response).to.have.status(200);
            done();
          });
      });
    });

});