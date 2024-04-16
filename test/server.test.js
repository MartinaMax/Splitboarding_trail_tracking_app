
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);



describe('/First Test Collection', () => {

    it('test default API welcome route', (done) => {

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            const actualVal= res.body.message;
            expect(actualVal).to.be.equal('Welcome to the Splitboarding trail treker')
            done();
        });
    });
});