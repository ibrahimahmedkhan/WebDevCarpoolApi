const router = require("express").Router();
const Passengers = require("../models/Passengers");

const {
    verifyUserTokenAndID,
} = require("./verification");


// get passengers
router.get("/", verifyUserTokenAndID, async (req, res) => {
    try {
        const query = req.query;
        const passengers = await Passengers.find({$and:[query]});
        res.status(200).json(passengers);
    } catch (err) {
        res.status(404).json("No passengers found with such query");
    }
});

// update passengers
router.put("/", verifyUserTokenAndID, async (req, res) => {
    try{
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString();
        } 

        const updatedPassenger = await Passengers.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedPassenger);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete passenger
router.delete("/", verifyUserTokenAndID, async (req, res) => {
    try {
        const deletedPassenger = await Passengers.findByIdAndUpdate(
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