import { NextFunction, Request, Response } from "express";
import passport from "passport";

// Middleware to authenticate user against db and return authenticatedUser to serializeUser function
export const authUser = (user: string, password: string, done: Function) => {
  // TODO: Check the username and password against a DB.
  if (user === "nk") {
    return done(null, false);
  }

  const authenticatedUser = { id: 123, name: user };

  return done(null, authenticatedUser);
};

// Passport js provides isAuthenticated built in method to check if user is logged in or not. Sweet!!
export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
};

// This adds req.session.passport.user.{...userObj}
passport.serializeUser((userObj, done: Function) => {
  done(null, userObj);
});

// This takes the userObj and adds it to req.user.{...userObj}
passport.deserializeUser((userObj, done: Function) => {
  done(null, userObj);
});

export default passport;
