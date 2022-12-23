const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
    {
        //need to check since this is foreign key
        driverID: {
            type: String,
            required: true,
        },
        //need to check since this is foreign key
        vehicleID : {
            type: String,
            required : true,
        },
        startingCoordinates: {
            type: Object,
            properties: {
                lat: {
                    type: String,
                    required: true,
                },
                long: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        endingCoordinates: {
            type: Object,
            properties: {
                lat: {
                    type: String,
                    required: true,
                },
                long: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        waypoints: [
            {
                type: Object,
                properties: {
                    lat: {
                        type: String,
                        required: true,
                    },
                    long: {
                        type: String,
                        required: true,
                    },
                },
                required: true,
            }
        ],
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

module.exports = mongoose.model("Ride", RideSchema);