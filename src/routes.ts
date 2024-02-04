import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("saml", {
    successRedirect: "/",
    failureRedirect: "/login-fail",
  })
);

router.post(
  "/login/sso/callback",
  // passport.authenticate("saml", {
  //   successRedirect: "/",
  //   failureRedirect: "/login-fail",
  // }),
  function (req, res) {
    console.log(req);
    res.redirect("/user/home");
  }
);

router.get("/home", (req, res) => {
  res.send("Logged in");
});

export default router;
