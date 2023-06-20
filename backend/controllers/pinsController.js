const Pin = require("../models/Pin");

const getAllPins = async (req, res) => {
    try {
        const allPins = await Pin.find({});
        res.status(200).json(allPins);
    } catch (error) {
        res.status(500).json(error);
    }
}   

const createPin = async (req, res) => {
    const pin = {...req.body};
    try {
        const data = await Pin.create(pin);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllPins,
    createPin,
}