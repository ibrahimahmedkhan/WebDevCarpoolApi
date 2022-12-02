const mongoose = require("mongoose");

const RideRequestSchema = new mongoose.Schema(
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

module.exports = mongoose.model("RideRequest", RideRequestSchema);