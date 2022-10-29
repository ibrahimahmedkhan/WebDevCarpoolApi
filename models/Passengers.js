const mongoose = require("mongoose");

const PassengersSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
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
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Passengers", PassengersSchema);