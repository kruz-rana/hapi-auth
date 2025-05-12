const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const emailexist = await User.findOne({ email });
        if (emailexist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedpwd = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedpwd, role });
        await user.save();

        res.status(201).json({ message: "User Registered" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailexist = await User.findOne({ email });
        if (!emailexist) {
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const ismatch = await bcrypt.compare(password, emailexist.password);
        if (!ismatch) return res.status(400).json({ message: "Invalid Username or Password" });

        const token = jwt.sign({ id: emailexist._id, role: emailexist.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, role: emailexist.role });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login };