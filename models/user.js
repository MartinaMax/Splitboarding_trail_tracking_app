const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User schema
let userSchema = new Schema (

    {
    // First name
        firstName: { 
            type: String,
            required: true,
            min: 2,
            max: 255
        },
    // Last name 
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 255
        },
    // Username
        username: {
            type: String,
            required: true,
            min: 2,
            max: 155
        },
    // Email
        email: {
            type: String,
            required: true,
            min: 5,
            max: 255
        },
    // Password
        password: {
            type: String,
            required: true,
            min: 8,
            max: 255
        },
    // Date
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("user", userSchema);
