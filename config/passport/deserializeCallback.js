import { getUserById } from "../db/queries/users.js";

// called by serializeUser with user id as parameter
// queries user from db using the id parameter
// and appends the user to req object
// req.body is populated with user info from this point onward
export const deserializeCb = async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};
