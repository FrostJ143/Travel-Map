const { getAllPins, createPin } = require("../controllers/pinsController");

const router = require("express").Router();

router.route("/").get(getAllPins).post(createPin);

module.exports = router;