const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User schema
let userSchema = new Schema (

    {
    // First name requirements
        firstName: { 
            type: String,
            required: true,
            min: 2,
            max: 255
        },
    // First name requirements
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 255
        },
    // Username requirements
        username: {
            type: String,
            required: true,
            min: 2,
            max: 155
        },
    // Email requirements
        email: {
            type: String,
            required: true,
            min: 5,
            max: 255
        },
    // Password requirements
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
