const mongoose = require("mongoose");

const AdminUser = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password : {
            type: String,
            required : true,
        },
        role: {
            type: String,
            required: true,
            enum: ["SU","CS"],
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

module.exports = mongoose.model("AdminUser", AdminUser);