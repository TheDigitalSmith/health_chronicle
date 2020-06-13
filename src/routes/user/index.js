const express = require("express");
const User = require("../../Model/User");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {});

userRouter.post("/signup", async (req, res) => {
  const newUser = User.register(req.body, req.body.password);
  res.send(newUser);
});

userRouter.put("/", async (req, res) => {});

userRouter.delete("/", async (req, res) => {});

module.exports = userRouter;
