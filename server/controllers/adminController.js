const Admin = require("../models/Admin");

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password,
      confirmPassword: password,
    });
    const admins = await admin.save();
    res.json("Admin created", admins);
    console.log(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdmins, postAdmin };
