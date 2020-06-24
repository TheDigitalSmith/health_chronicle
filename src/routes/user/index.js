const express = require("express");
const userRouter = express.Router();
const passport = require("passport");

const User = require("../../Model/User");
const { Disease } = require("../../Model/Diseases");
const { getToken } = require("../../utils/auth");

userRouter.get("/me", passport.authenticate("jwt"), async (req, res) => {
  const user = await User.findById(req.user._id).populate("diseases");
  res.send(user);
});

userRouter.post("/signup", async (req, res) => {
  const newUser = await User.register(req.body, req.body.password);
  const user = await User.findById(newUser._id);
  const token = getToken(newUser);
  res.send({ user, access_token: token });
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

userRouter.put("/diseases", passport.authenticate("jwt"), async (req, res) => {
  const disease = await Disease.findOne({ name: req.body.name });
  if (!disease) {
    const newDisease = await Disease.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          diseases: newDisease._id,
        },
      },
      { new: true, runValidators: true }
    );
    console.log(user);
    return res.json(user);
  }
  const user = await User.findById(req.user._id);
  user.diseases.push(disease._id);
  await user.save();
  res.json(user);
});

userRouter.delete(
  "/diseases",
  passport.authenticate("jwt"),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          diseases: req.body.diseaseID,
        },
      },
      { new: true, runValidators: true }
    );
    res.json(user);
  }
);

module.exports = userRouter;
