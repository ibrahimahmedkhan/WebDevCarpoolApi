const mongoose = require("mongoose");

const RidePassengerSchema = new mongoose.Schema(
    {
        rideID: {
            type: String,
            required: true,
        },
        passengerID: {
            type: String,
            required: true,
        },
        startingCoordinates: {
            type: String, 
            required: true,
        },
        endingCoordinates: {
            type: String,
            required: true,
        },
        rideFare: {
            type: Number,
            required: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("RidePassenger", RidePassengerSchema);