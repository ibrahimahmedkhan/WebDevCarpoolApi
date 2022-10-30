const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        password : {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["M","F"],
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        rating: {
            type: Number,
            minimum: 0,
            maximum: 5,
        },
        profilePictureLink: {
            type: String,
            required: true,
        },
        favorites: {
            type: Array,
            items: {
                type: Object,
                properties: {
                    coordinates: {
                        type: String,
                        required: true,
                    },
                    name: {
                        type: String, 
                        required: true, 
                    },
                },
            },
            default : [],
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

module.exports = mongoose.model("Passenger", PassengerSchema);