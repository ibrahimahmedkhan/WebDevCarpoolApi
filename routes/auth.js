const router = require("express").Router();
const User = require("../models/Users");
const Passenger = require("../models/Passenger");
const AdminUser = require("../models/AdminUser");
const Driver = require("../models/Driver")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const e = require("express");

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
router.post("/passenger/register", async (req, res) =>{
    
    const newPassenger = new Passenger({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
        gender: req.body.gender,
        profilePictureLink: req.body.profilePictureLink,
    });

    try {
        const savedPassenger = await newPassenger.save();
        res.status(200).json("Successfully created new passenger.");
    } catch (err) {
        res.status(500).json(err);

    }
});


//PassengerLogin
router.post("/passenger/login", async (req, res) => {
    try {
        const passenger = await Passenger.findOne({email: req.body.email});
        if (passenger.isDelete === true){
            res.status(404).json("Passenger might be deleted");
        } else {
            if (!passenger) {
                res.status(404).json("Passenger Not Found");
            } else {
                const hashedPass = CryptoJS.AES.decrypt(passenger.password, process.env.PASS_SEC);
                const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
                if (originalPass != req.body.password) {
                    res.status(401).json("Wrong Credentials");
                } else {
                    
                    const accessToken = jwt.sign({
                        id: passenger._id,
                    }, process.env.JWT_KEY, {expiresIn:"3d"});

                    res.status(200).json(accessToken);
                } 
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//Admin Register
router.post("/admin/register", async (req, res) =>{
    
    const newAdmin = new AdminUser({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        role: req.body.role,
    });

    try {
        const savedAdmin = await newAdmin.save();
        res.status(200).json("Successfully created new admin.");
    } catch (err) {
        res.status(500).json(err);
    }
});

//admin
router.post("/admin/login", async (req, res) => {
    try {
        const admin = await AdminUser.findOne({username: req.body.username}); 
        if (!admin) {
            res.status(404).json("Admin Not Found");
        } else {
            const hashedPass = CryptoJS.AES.decrypt(admin.password, process.env.PASS_SEC);
            const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
            if (originalPass != req.body.password) {
                res.status(401).json("Wrong Credentials");
            } else {
                
                const accessToken = jwt.sign({
                    id: admin._id,
                }, process.env.JWT_KEY, {expiresIn:"3d"});

                res.status(200).json(accessToken);
            } 
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



//Driver Register
router.post("/driver/register", async (req, res) =>{
    
    const newDriver = new Driver({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        phone: req.body.phone,
        gender: req.body.gender,
        profilePictureLink: req.body.profilePictureLink,
        licenseNumber: req.body.licenseNumber,
    });

    try {
        const savedDriver = await newDriver.save();
        res.status(200).json("Successfully created new Driver.");
    } catch (err) {
        res.status(500).json(err);

    }
});


//Driver Login
router.post("/driver/login", async (req, res) => {
    try {
        const driver = await Driver.findOne({email: req.body.email});
        if (driver.isDelete === true){
            res.status(404).json("Driver might be deleted");
        } else {
            if (!driver) {
                res.status(404).json("Driver Not Found");
            } else {
                const hashedPass = CryptoJS.AES.decrypt(driver.password, process.env.PASS_SEC);
                const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);
                if (originalPass != req.body.password) {
                    res.status(401).json("Wrong Credentials");
                } else {
                    
                    const accessToken = jwt.sign({
                        id: driver._id,
                    }, process.env.JWT_KEY, {expiresIn:"3d"});

                    res.status(200).json(accessToken);
                } 
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;