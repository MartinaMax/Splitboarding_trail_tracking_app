const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('User workflow tests', () => {
    it('invalid user login a user test ', (done) => {

    // 1. Register a new user
    let user = {
        firstName: "John",
        lastName: "Murphy",
        username: "cockroach",
        email: "cockroach@murphy.com",
        password: "I_love_Murphy"
    }
    chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {

            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.error).to.be.equal(null);
            
            //2. Login this user
            chai.request(server)
                .post('/api/user/login')
                .send({
                    "email": "cockroach@murphy.com",
                    "password": "LoveMurphy"
                })
                .end((err, res) => {

                    expect(res.status).to.be.equal(400);
                    expect(res.body.error).to.be.equal('Wrong password. Try again.');

                    done();
                })
            })
        })
})