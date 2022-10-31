const router = require("express").Router();
const Passenger = require("../models/Passenger");
const CryptoJS = require("crypto-js")
const {
    verifyToken,
    verifyUserTokenAndID,
} = require("./verification");


// get passengers
router.get("/", verifyToken, async (req, res) => {
    try {
        const query = req.query;
        const passengers = await Passenger.find({$and:[query]});
        res.status(200).json(passengers);
    } catch (err) {
        res.status(404).json("No passengers found with such query");
    }
});

// update passengers
router.patch("/:id", verifyUserTokenAndID, async (req, res) => {
    try{
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString();
        } 
        const updatedPassenger = await Passenger.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedPassenger);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//delete passenger
router.delete("/:id", verifyUserTokenAndID, async (req, res) => {
    try {
        const deletedPassenger = await Passenger.findByIdAndUpdate(
            req.params.id,
            {
                isDelete: true,
            },
            { new: true } 
        );
        res.status(200).json("Passenger is succesfully deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;