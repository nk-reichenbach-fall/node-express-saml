import passport from "passport";
import passportSaml from "passport-saml";

passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

const strategy = new passportSaml.Strategy(
  {
    entryPoint: process.env.SSO_ENTRYPOINT,
    callbackUrl: process.env.SSO_CALLBACK_URL,
    issuer: process.env.SSO_ISSUER,
    cert: process.env.SSO_CERT!,
  },
  (profile, done) => done(null, profile)
);

passport.use(strategy);

export default passport;
