import express, { NextFunction, Request } from "express";
import helmet from "helmet";
import session from "express-session";

import passport, { authUser, checkAuthenticated } from "./config/passportLocal";

import { Strategy as LocalStrategy } from "passport-local";

// import passport from "./config/saml-auth";
// import router from "./routes";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(helmet());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(authUser));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

app.get("/dashboard", checkAuthenticated, (req: Request, res) => {
  res.render("dashboard.ejs", { name: req.user?.name });
});

app.delete("/logout", (req: Request, res, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next();
    }
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
