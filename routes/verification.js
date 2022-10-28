const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (authHeader) {
        console.log(req.headers);
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid.");
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json("You do not have authentication!");
    }
};

const verifyUserTokenAndID = (req, res, next) => {
    verifyToken (req, res, () => {
        console.log(req.user);
        console.log(req.query);
        if (req.user.id === req.query.id) {
            next();
        } else {
            res.status(403).json("You do not have authentication to do that.")
        }
    })
}

module.exports = {
    verifyToken,
    verifyUserTokenAndID,
}