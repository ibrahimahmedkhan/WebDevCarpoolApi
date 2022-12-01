const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
    {
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
        phone: {
            type: String,
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
            enum: ["M","F"],
            required: true,
        },
        rating: {
            type: Number,
            minimum: 0,
            maximum: 5,
            required: true,
            default: 5,
        },
        //need to figure out how to add image file to this
        profilePictureLink: {
            type: String,
            required: true,
            unique: true,
        },
        licenseNumber: {
            type: String,
            required: true,
            unique: true,
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

module.exports = mongoose.model("Driver", DriverSchema);