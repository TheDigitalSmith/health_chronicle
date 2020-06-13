const LocalStrategy = require("passport-local").Strategy;
const User = require("../../Model/User");
const passport = require("passport");

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
