const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://expert-space-trout-rq9g6wr776p3x97p-5173.app.github.dev",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://expert-space-trout-rq9g6wr776p3x97p-3000.app.github.dev/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.get("/", (req, res) => res.send("Servidor funcionando correctamente"));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://expert-space-trout-rq9g6wr776p3x97p-5173.app.github.dev/dashboard");
  }
);

app.get("/auth/user", (req, res) => {
  res.send(req.user || null);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en https://expert-space-trout-rq9g6wr776p3x97p.github.dev:${PORT}`));