const router = require("express").Router();
const User = require("../models/Users");
const Passenger = require("../models/Passenger");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/user/register", async (req, res) =>{
    
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json("Sucess");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}); 
        if (!user) {
            res.status(404).json("User Not Found");
        } else {
            const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
            if (originalPass != req.body.password) {
                res.status(401).json("Wrong Credentials");
            } else {
                
                const accessToken = jwt.sign({
                    id: user._id,
                }, process.env.JWT_KEY, {expiresIn:"3d"});

                res.status(200).json(accessToken);
            } 
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



//Passenger Register
router.post("/Passenger/register", async (req, res) =>{
    
    const newPassenger = new Passenger({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
        gender: req.body.gender,
        profilePictureLink: req.body.profilePictureLink,
        favorites: [],
    });

    try {
        const savedPassenger = await newPassenger.save();
        res.status(200).json("Successfully created new passenger.");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;