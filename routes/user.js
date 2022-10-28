const router = require("express").Router();
const User = require("../models/Users");
const {
    verifyUserTokenAndID,
  } = require("./verification");

router.get("/",verifyUserTokenAndID, async (req,res) => {
    try {
        console.log(req.headers);
        const query = req.query;
        const users = await User.findOne({$and:[query]});
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json("No user found with such query.");
    }
});

module.exports = router;