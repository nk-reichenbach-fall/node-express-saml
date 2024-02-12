import express, { NextFunction, Request } from "express";
import helmet from "helmet";
import session from "express-session";

import passport, {
  authUser,
  checkAuthenticated,
  isLoggedIn,
} from "./config/passportLocal";

import { Strategy as LocalStrategy } from "passport-local";

import UserTable from "./db/user";
UserTable.createUserTable().then(console.log).catch(console.log);

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

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", isLoggedIn, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  console.log(req.body.email, req.body.password);
  const addedUser = await UserTable.addUser(req.body.email, req.body.password);
  res.redirect("/dashboard");
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

app.get("/logout", (req: Request, res, next: NextFunction) => {
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
