const mongoose = require("mongoose");

const connectDb = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DataBase");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
