import { getUserByUsername } from "../db/queries/users.js";
import bcrypt from "bcryptjs";

// runs when user tries to log in
// is called by passport library when passport.authenticate() method is called on login form submission
// username & password field are populated directly via the form upon submit
// does a db query to look for existing user and if credentials are correct, authenticates the user
export const verifyCb = async (username, password, done) => {
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false, { messages: "incorrect username!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { messages: "incorrect password" });
    }
    // once user is authenticated, passes all info about user from db into next function (passport.serializeUser())
    done(null, user);
  } catch (error) {
    return done(error);
  }
};
