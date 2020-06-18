const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../Model/User");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_PASSWORD,
};

passport.use(
  new JwtStrategy(jwtOpts, (payload, cb) => {
    User.findById(payload._id, (err, user) => {
      if (err) return cb(err, false);
      else if (user) return cb(false, user);
      else return cb(null, false);
    });
  })
);

module.exports = {
  getToken: (user) =>
    jwt.sign({ _id: user._id }, process.env.TOKEN_PASSWORD, {
      expiresIn: 3600 * 72,
    }),
};
