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