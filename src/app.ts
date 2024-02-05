import express, { Request } from "express";
import helmet from "helmet";
import session from "express-session";

import passport, { authUser } from "./config/passportLocal";

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

app.post("/login", (req, res) => {
  passport.authenticate("local");
});

app.get("/dashboard", (req: Request, res) => {
  res.render("dashboard.ejs", { name: req.user?.name });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
