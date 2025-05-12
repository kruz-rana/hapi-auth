const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authanticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Access denied.No token provided" });

        const decode = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        if (!decode) return res.status(400).json({ message: "Invalid Token" });

        console.log(decode);
        const user = await User.findOne({ _id: decode.id });
        if (!user) return res.status(403).json({ message: "User Not Found. Authentication Failed." });

        req.user = user;
        console.log(req.user);
        next();
    } catch (err) {
        console.log("error in authentication : ", err.message);
        res.status(400).json({ message: "Invalid Token" });
    }
}

const isadmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied. Admins Only" });
    }
    next();
}

module.exports = { authanticate, isadmin }