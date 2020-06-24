const express = require("express");
const userRouter = express.Router();
const passport = require("passport");

const { User, userValidator } = require("../../Model/User");
const { Disease } = require("../../Model/Diseases");
const { Medicine } = require("../../Model/Medicines");
const { getToken } = require("../../utils/auth");
const validate = require("../../utils/validate");

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

userRouter.put(
  "/me",
  [passport.authenticate("jwt"), validate(userValidator)],
  async (req, res) => {
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );
    res.send(updatedInfo);
  }
);

userRouter.delete("/", passport.authenticate("jwt"), async (req, res) => {
  const removeUser = await User.findByIdAndRemove(req.user._id);
  res.send({ Remove: "Successful", user: removeUser });
});

userRouter.put(
  "/diseases/add",
  passport.authenticate("jwt"),
  async (req, res) => {
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
      return res.json(user);
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          diseases: disease._id,
        },
      },
      { new: true, runValidators: true }
    );
    res.json(user);
  }
);

userRouter.put(
  "/diseases/remove",
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
    if (!user) return res.status(404).json("User/disease not found");
    res.json(user);
  }
);

userRouter.put(
  "/medicines/add",
  passport.authenticate("jwt"),
  async (req, res) => {
    const medicine = await Medicine.findOne({ name: req.body.name });
    if (!medicine) {
      const newMedicine = await Medicine.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { medicines: newMedicine._id },
        },
        { new: true, runValidators: true }
      );
      return res.json(user);
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { medicines: medicine._id },
      },
      { new: true, runValidators: true }
    );
    res.json(user);
  }
);

userRouter.put(
  "/medicine/remove",
  passport.authenticate("jwt"),
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { medicine: req.body.medicineID },
      },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json("User/disease not found");
    res.json(user);
  }
);
module.exports = userRouter;
