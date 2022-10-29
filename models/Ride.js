const mongoose = require("mongoose");

const RideScehema = new mongoose.Schema(
    {
        rideID: {
            type: Number,
            required: true,
        },
        //need to check since this is foreign key
        riderId: {
            type: Number,
            required: true,
            unique: true
        },
        //need to check since this is foreign key
        carID : {
            type: Number,
            required : true,
            unique: true
        },
        startingCoordinates: {
            type: String,
            required: true,
        },
        endingCoordinates: {
            type: Number,
            required: true,
        },
        totalFare: {
            type: Number,
            required: true,
        },
        availableSeats: {
            type: Number,
            required: true,
        },
        isFemaleOnly: {
            type: Boolean,
            required: true,
        },
        //String might not be best type for dateTime
        dateTime: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Ride", RideScehema);