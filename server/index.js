const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const authRoute = require("./routes/authRoute");

const cors = require("cors");
const employeeRoute = require("./routes/employeeRoute");
const adminRoute = require("./routes/adminRoute");
const leadsRoute = require("./routes/leadsRoute");

const connectDb = require("./config/DB");

app.use(cors());

app.use(express.json());

connectDb();

app.use("/auth", authRoute);
app.use("/employee", employeeRoute);
app.use("/admin", adminRoute);
app.use("/leads", leadsRoute);

app.get("/", (req, res) => {
  res.json({ message: "Server is running on port 3000" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
