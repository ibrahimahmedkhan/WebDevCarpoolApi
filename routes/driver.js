const router = require("express").Router();
const Driver = require("../models/Driver");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
    verifyUserTokenAndID,
} = require("./verification");
const { read, updateWithPassword, deleteData } = require("./rud");

router.get("/", verifyToken, async (req, res) => await read(Driver, "Driver", req, res));

router.patch("/:id", verifyUserTokenAndID, async (req, res) => await updateWithPassword(Driver, req, res));

router.delete("/:id", verifyUserTokenAndID, async (req, res) => await deleteData(Driver, "Driver", req, res));

module.exports = router;