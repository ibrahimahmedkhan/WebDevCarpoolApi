const router = require("express").Router();
const Vehicle = require("../models/Vehicle");

const {
    verifyUserTokenAndID,
    verifyToken,
} = require("./verification");

//create new vehicle
router.post("/", verifyToken, async (req, res) => {
    try {
        const newVehicle = new Vehicle({
            riderID: req.body.riderID,
            color: req.body.color,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            ac: req.body.year,
            carType: req.body.carType,
            seatingCapacity : req.body.seatingCapacity,
            imageLink: req.body.imageLink,
            plateNumber: req.body.plateNumber,
        });

        const savedVechicle = await newVehicle.save();
        res.status(200).json("Successfully created a new vehicle.")
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all vehicles. query fits in
router.get("/", verifyToken, async (req, res) => {
    try {
        const query = req.query;
        const vehicles = await Vehicle.find({$and:[query]});
        res.status(200).json(vehicles);
    } catch (err) {
        res.status(404).json("No vehicles found with such query");
    }
})

//update vehicles
router.patch("/:id", verifyToken, async (req, res) => {
    try{
        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedVehicle);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete vehicle
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            {
                isDelete: true,
            },
            { new: true } 
        );
        res.status(200).json("Vehicle is succesfully deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;