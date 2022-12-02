const router = require("express").Router();
const RidePassenger = require("../models/RidePassenger");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
} = require("./verification");
const { read } = require("./rud");


router.post("/", verifyToken, async (req, res) => {
    try {
        const newRidePassenger = new RidePassenger({
            rideID: req.body.rideID,
            passengerID: req.body.passengerID,
            startingCoordinates: req.body.startingCoordinates,
            endingCoordinates: req.body.endingCoordinates,
            rideFare: req.body.rideFare,
        });
        const savedRidePassenger = await newRidePassenger.save();
        res.status(200).json(savedRidePassenger);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/", verifyToken, async (req, res) => await read(RidePassenger, "ride passenger", req, res));

router.patch("/:id", verifyToken, async (req, res) => await updateWithPassword(RidePassenger, req, res));

router.delete("/:id", verifyToken, async (req, res) => await deleteData(RidePassenger, "ride passenger", req, res));

module.exports = router;