const passport = require("passport");
const listEndPoints = require("express-list-endpoints");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const auth = require("./src/utils/auth");
const app = express();

const userService = require("./src/routes/user");

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => console.log(err ? err : "MongoDb connected")
);

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/api/users", userService);

app.get("/", (req, res) => {
  res.send("Server running");
});

const port = process.env.PORT || 9120;
app.listen(port, () => {
  console.log(`Your app is launched on port ${port}`);
});

console.log(listEndPoints(app));
