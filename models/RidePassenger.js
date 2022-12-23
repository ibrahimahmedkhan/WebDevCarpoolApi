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