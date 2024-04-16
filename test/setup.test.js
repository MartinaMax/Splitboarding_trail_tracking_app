process.env.NODE_ENV = 'test';

const trailSchema = require('../models/trail');
const userSchema = require('../models/user');


before((done) => {
    userSchema.deleteMany({}, function(err) {});
    trailSchema.deleteMany({}, function(err) {});
    done();
});

after((done) => {
    userSchema.deleteMany({}, function(err) {});
    trailSchema.deleteMany({}, function(err) {});
    done();
});
