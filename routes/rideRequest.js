const router = require("express").Router();
const RideRequest = require("../models/RideRequest");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
} = require("./verification");
const { read, deleteData, updateWithoutPassword } = require("./rud");


router.post("/", verifyToken, async (req, res) => {
    try {
        const newRideRequest = new RideRequest({
            rideID: req.body.rideID,
            passengerID: req.body.passengerID,
            startingCoordinates: req.body.startingCoordinates,
            endingCoordinates: req.body.endingCoordinates,
            waypoints: req.body.waypoints,
        });
        const savedRideRequest = await newRideRequest.save();
        res.status(200).json(savedRideRequest);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/", verifyToken, async (req, res) => await read(RideRequest, "ride request", req, res));

router.patch("/:id", verifyToken, async (req, res) => await updateWithoutPassword(RideRequest, req, res));

router.delete("/:id", verifyToken, async (req, res) => await deleteData(RideRequest, "ride request", req, res));

module.exports = router;