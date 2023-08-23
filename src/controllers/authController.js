const userDao = require("../dao/userDao");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({ message: "Password need to be at least 8 long and need numerical and alphabetical letters" });
    }

    const existingUser = await userDao.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exist" });
    }
    await userDao.createUser({ username, email, password, role });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(`Error registering the user`, error);
    return res.status(500).json({ message: "Error in registering user, interval server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({message: "Email or password is required"})
    }

    const user = await userDao.findUserByUsername(username);
    if (!user) { 
      return res.status(401).json({ message: "Username not found :("})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Invalid Password :("});
    }
    const accessToken = jwt.sign({
      userId: user._id, 
      username: user.username,
      role: user.role,
    },  
    config.tokenSecret);
    return res.status(200).json({ accessToken})
  } catch(error) {
    console.error('Internal server error:', error);
    return res.status(500).json({message: "Internal Server error"})
  }
};

module.exports = { registerUser, login };
