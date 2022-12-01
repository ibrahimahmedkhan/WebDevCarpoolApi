const router = require("express").Router();
const Passenger = require("../models/Passenger");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
    verifyUserTokenAndID,
} = require("./verification");
const { read } = require("./rud");


router.get("/", verifyToken, async (req, res) => await read(Passenger, "Passenger", req, res));

router.patch("/:id", verifyUserTokenAndID, async (req, res) => await updateWithPassword(Passenger, req, res));

router.delete("/:id", verifyUserTokenAndID, async (req, res) => await deleteData(Passenger, "Passenger", req, res));

module.exports = router;