import express from "express";
import passport from "passport";
import Saml2js from "saml2-js";

const router = express.Router();

router.post(
  "/login/sso/callback",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  (req, res, next) => {
    const samlResponse = req.body.SAMLResponse;
    // const parser = new Sa(samlResponse);
    console.log(samlResponse);
    next();
  }
);

export default router;
