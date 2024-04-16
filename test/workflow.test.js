
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('User and trail workflow tests', () => {
    it('should register & login a user, create trail and check if it is in the database', (done) => {

    // 1. Register a new user
    let user = {
        firstName: "Leonard",
        lastName: "Lego",
        username: "LLego",
        email: "llego@institute.com",
        password: "I_love_LEGO"
    }
    chai.request(server)
        .post('/api/user/register')
        .send(user)
        .end((err, res) => {

            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body.error).to.be.equal(null);
            let userID = res.body.data;
            

            //2. Login this user
            chai.request(server)
                .post('/api/user/login')
                .send({
                    "email": "llego@institute.com",
                    "password": "I_love_LEGO"
                })
                .end((err, res) => {

                    expect(res.status).to.be.equal(200);
                    expect(res.body.error).to.be.equal(null);
                    let token = res.body.data.token;


                    //3. Create a new trail
                    let trail =
                    {
                        createdBy: userID,
                        trailName: "Hokkaido",
                        description: "Very nice",
                        distance: 6,
                        duration: "3hours",
                        date: "2024-02-23T16:06:25.953Z",
                    };

                    chai.request(server)
                        .post('/api/trail')
                        .set({ "auth-token": token })
                        .send(trail)
                        .end((err, res) => {

                            expect(res.status).to.be.equal(200);
                            expect(res.body).to.be.a('array');
                            expect(res.body.length).to.be.equal(1);

                            let savedTrail = res.body[0];
                            expect(savedTrail.createdBy).to.be.equal(trail.createdBy);
                            expect(savedTrail.trailName).to.be.equal(trail.trailName);
                            expect(savedTrail.description).to.be.equal(trail.description);
                            expect(savedTrail.distance).to.be.equal(trail.distance);
                            expect(savedTrail.duration).to.be.equal(trail.duration);
                            expect(savedTrail.date).to.be.equal(trail.date);

                            
                        //4. Get the trail
                        chai.request(server)
                            .get(`/api/trail/${userID}`)
                            .set({ "auth-token": token })
                            .end((err, res) => {

                                expect(res.status).to.be.equal(200);
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.equal(1);
                     
                            done();
                        });
                    });       
                });     
        });
    });
});