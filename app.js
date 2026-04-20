import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./config/db/pool.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyCb } from "./config/passport/verifyCallback.js";
import { serializeCb } from "./config/passport/serializeCallback.js";
import { deserializeCb } from "./config/passport/deserializeCallback.js";
import { indexRouter } from "./routes/index.js";
import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { logoutRouter } from "./routes/logout.js";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

const PostgresStore = connectPgSimple(session);
app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, // will only save session to db when users logs in otherwise a session is created but wont be saved to db unless it is initialized i.e users logs in
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day (24 hr * 60 min * 60 sec * 1000ms )
    },
  }),
);
app.use(passport.session());

passport.use(new LocalStrategy(verifyCb));
passport.serializeUser(serializeCb);
passport.deserializeUser(deserializeCb);

// helper middlewares
// 1 to append user object to locals as currentUser
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// 2 console-ing session and user object from req for better debugging
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on port ${PORT}`);
});
