const router = require("express").Router();
const Ride = require("../models/Ride");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
} = require("./verification");
const { read, deleteData, updateWithoutPassword } = require("./rud");


router.post("/", verifyToken, async (req, res) => {
    try {
        const newRide = new Ride({
            driverID: req.body.driverID,
            vehicleID: req.body.vehicleID,
            startingCoordinates: req.body.startingCoordinates,
            endingCoordinates: req.body.endingCoordinates,
            waypoints: req.body.waypoints,
            totalFare: req.body.totalFare,
            availableSeats: req.body.availableSeats,
            isFemaleOnly: req.body.isFemaleOnly,
            dateTime: req.body.dateTime,
        });
        const savedRide = await newRide.save();
        res.status(200).json(savedRide);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/", verifyToken, async (req, res) => await read(Ride, "Ride", req, res));

router.patch("/:id", verifyToken, async (req, res) => await updateWithoutPassword(Ride, req, res));

router.delete("/:id", verifyToken, async (req, res) => await deleteData(Ride, "Ride", req, res));

module.exports = router;