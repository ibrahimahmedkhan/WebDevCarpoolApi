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
        status: {
            type: String,
            enum: ["Pending", "Denied"],
            default: "Pending",
            required: true
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