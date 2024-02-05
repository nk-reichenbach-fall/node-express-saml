import passport from "passport";

export const authUser = (user: string, password: string, done: Function) => {
  const authenticatedUser = { id: 123, name: user };

  return done(null, authenticatedUser);
};

passport.serializeUser((userObj, done: Function) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done: Function) => {
  done(null, userObj);
});

export default passport;
