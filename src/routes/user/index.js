const express = require("express");
const User = require("../../Model/User");
const userRouter = express.Router();
const { getToken } = require("../../utils/auth");
const passport = require("passport");

userRouter.get("/me", passport.authenticate("jwt"), async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

userRouter.post("/signup", async (req, res) => {
  try {
    const newUser = await User.register(req.body, req.body.password);
    const user = await User.findById(newUser._id);
    const token = getToken(newUser);
    res.send({ user, access_token: token });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/signin", passport.authenticate("local"), async (req, res) => {
  const user = await User.findById(req.user._id);
  const token = getToken(user);
  res.send({ user, access_token: token });
});

userRouter.put("/me", passport.authenticate("jwt"), async (req, res) => {
  const updatedInfo = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    { new: true, runValidators: true }
  );
  res.send(updatedInfo);
});

userRouter.delete("/", passport.authenticate("jwt"), async (req, res) => {
  const removeUser = await User.findByIdAndRemove(req.user._id);
  res.send({ Remove: "Successful", user: removeUser });
});

module.exports = userRouter;
