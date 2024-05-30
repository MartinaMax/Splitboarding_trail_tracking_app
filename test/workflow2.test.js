const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('User workflow tests', () => {
    it('should register a user and testing invalid password while user login', (done) => {

    // 1. Register a new user
    let user = {
        firstName: "John",
        lastName: "Murphy",
        username: "cockroach",
        email: "cockroach@murphy.com",
        password: "IamMurphy"
    }
    chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {

            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.error).to.be.equal(null);
            
            //2. Login this user (invalid password)
            chai.request(server)
                .post('/api/user/login')
                .send({
                    "email": "cockroach@murphy.com",
                    "password": "MurphyMurphy"
                })
                .end((err, res) => {

                    expect(res.status).to.be.equal(400);
                    expect(res.body.error).to.be.equal('Wrong password. Try again.');
                    done();
                })
            })
        })
})