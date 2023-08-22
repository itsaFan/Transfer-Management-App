const userDao = require("../dao/userDao");

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

module.exports = { registerUser };
