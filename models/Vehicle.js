const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
    {
        driverID: {
            type: String, 
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        make: {
            type: String, 
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        ac: {
            type: Boolean,
            required: true,
        },
        carType: {
            type: String,
            required: true,
            enum: ["hatchback", "sedan", "crossover suv", "suv", "pickup truck", "mini van"],
        },
        seatingCapacity: {
            type: Number,
            required: true,
        },
        imageLink: {
            type: String,
            required: true,
        },
        plateNumber: {
            type: String,
            required: true,
            unique: true,
        },
        isDelete: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);