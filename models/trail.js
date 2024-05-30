const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Trail schema
let trailSchema = new Schema (

    {
     // Created by user with id
        createdBy: { 
            type: Schema.Types.ObjectId, 
            ref: 'user', 
            required: true },
    // Trail name
        trailName: { 
            type: String,
            required: true,
            min: 5,
            max: 255
        },
    // Description
        description: {type: String},
    // Distance
        distance: {
            type: Number,
            required: true,
        },
    //Duration
        duration: { 
            type: String,
            required: true,
        },
    // Date
        date: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model("trail", trailSchema);