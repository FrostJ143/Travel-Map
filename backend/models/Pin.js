const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    title: {
        type: String,
        required: true,
        min: 3
    },
    desc: {
        type: String,
        required: true,
        min: 3,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    }, 
    long: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Pin", PinSchema);