// called after user successfully authenticates, by verify callback of chosen strategy
// appends user.id from db to req.session object
// specifically req.session.passport.user property
// and passes it to next, passport.deserializeUser()
export const serializeCb = (user, done) => {
  done(null, user.id);
};
