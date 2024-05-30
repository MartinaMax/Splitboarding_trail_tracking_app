process.env.NODE_ENV = 'test';

const trailSchema = require('../models/trail');
const userSchema = require('../models/user');

// Clears the database before the test
before((done) => {
    userSchema.deleteMany({}, function(err) {});
    trailSchema.deleteMany({}, function(err) {});
    done();
});

// Clears the database after the test
after((done) => {
    userSchema.deleteMany({}, function(err) {});
    trailSchema.deleteMany({}, function(err) {});
    done();
});
