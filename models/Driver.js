const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
    {
        riderID: {
            type: Number,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName : {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        //TODO: might make gender a bool instead of String
        gender: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        //need to figure out how to add image file to this
        profilePicture: {
            type: String,
            required: true,
            unique: true,
        },
        licenseNumber: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Driver", DriverSchema);