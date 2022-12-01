const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const { read, updateWithoutPassword, deleteData } = require("./rud");

const {
    verifyToken,
} = require("./verification");

//create new vehicle
router.post("/", verifyToken, async (req, res) => {
    try {
        const newVehicle = new Vehicle({
            driverID: req.body.driverID,
            color: req.body.color,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            ac: req.body.ac,
            carType: req.body.carType,
            seatingCapacity : req.body.seatingCapacity,
            imageLink: req.body.imageLink,
            plateNumber: req.body.plateNumber,
        });

        const savedVehicle = await newVehicle.save();
        res.status(200).json(savedVehicle)
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all vehicles. query fits in
router.get("/", verifyToken, async (req, res) => await read(Vehicle, "Vehicle", req, res))

//update vehicles
router.patch("/:id", verifyToken, async (req, res) => await updateWithoutPassword(Vehicle, req, res));

//delete vehicle
router.delete("/:id", verifyToken, async (req, res) => await deleteData(Vehicle, "Vehicle", req, res));

module.exports = router;