const router = require("express").Router();
const AdminUser = require("../models/AdminUser");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {
    verifyToken,
} = require("./verification");



// get Admin User
router.get("/", verifyToken, async (req, res) => {
    try {
        const query = req.query;
        const admin = await AdminUser.find({$and:[query]});
        res.status(200).json(admin);
    } catch (err) {
        res.status(404).json("No admin found with such query");
    }
});


//create
router.post("/", async (req, res) =>{
    
    const newUser = new AdminUser({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        role: req.body.role,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


// update admin
router.patch("/:id", verifyToken, async (req, res) => {
    try{
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.PASS_SEC
            ).toString();
        } 

        const updatedAdmin = await AdminUser.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedAdmin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete admin
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedAdmin = await AdminUser.findByIdAndUpdate(
            req.params.id,
            {
                isDelete: true,
            },
            { new: true } 
        );
        res.status(200).json(deletedAdmin);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;