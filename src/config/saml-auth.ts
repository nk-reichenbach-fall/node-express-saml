import passport from "passport";
import { Strategy as SamlStrategy } from "@node-saml/passport-saml";
import "dotenv/config";

passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

function findByEmail(email: string) {
  return "Email";
}

console.log(process.env.SSO_ISSUER);

const strategy = new SamlStrategy(
  {
    entryPoint: process.env.SSO_ENTRYPOINT,
    callbackUrl: process.env.SSO_CALLBACK_URL,
    issuer: process.env.SSO_ISSUER!,
    cert: process.env.SSO_CERT!,
    wantAssertionsSigned: false,
    wantAuthnResponseSigned: false,
  },
  (profile: any, done: (error: any, user?: any) => void) => done(null, profile),
  (profile: any, done: (error: any, user?: any) => void) => done(null, profile)
);

passport.use(strategy);

export default passport;
