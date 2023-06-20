const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const user = {...req.body};
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const data = await User.create(user);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: "Email and password are required!"});
    }

    try {
        const foundUser = await User.findOne({username});
        if (!foundUser) {
            return res.status(400).json({message: "Wrong username or password!"});
        }

        const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
        if (isCorrectPassword) {
            return res.status(202).json({message: "Login successfully!"});
        } else {
            return res.status(200).json({message: "Wrong username or password!"});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    register,
    login
}