import { body, matchedData, validationResult } from "express-validator";
import passport from "passport";
import { getUserByUsername, insertUser } from "../config/db/queries/users.js";
import { getAllMsg } from "../config/db/queries/notes.js";

export const getIndex = async (req, res) => {
  const allMsg = await getAllMsg();
  // console.log(typeof allMsg[0].id);
  res.render("index", { allMsg });
};

// validation errors
export const emptyMsgErr = `must not be empty!`;

// Validates names allowing alphanumeric characters separated by single spaces, hyphens, or apostrophes.
const nameRegex = /^[a-zA-Z0-9._-]+$/;
const nameRegexErr = `must start with a letter and can only include letters, numbers, hyphens, or apostrophes.`;
const nameLengthErr = `must have minimum length of 2`;

// Validates a standard email address format with a name, @ symbol, domain, and 2+ character TLD.
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const emailRegexErr = "a valid email address (e.g., name@example.com).";

const loginFormValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyMsgErr}`)
    .matches(emailRegex)
    .withMessage(`Username Should ${emailRegexErr}`),

  body("password")
    .isLength({ min: 5 })
    .withMessage(`password must have minimum length of 5`),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`confirm password must be same as password`),
];
const registerFormValidation = [
  body(["firstname", "lastname"])
    .trim()
    .notEmpty()
    .withMessage((value, { path }) =>
      path === "firstname"
        ? `First Name ${emptyMsgErr}`
        : `Last Name ${emptyMsgErr}`,
    )
    .matches(nameRegex)
    .withMessage((value, { path }) =>
      path === "firstname"
        ? `First Name ${nameRegexErr}`
        : `Last Name ${nameRegexErr}`,
    )
    .isLength({ min: 2 })
    .withMessage((value, { path }) =>
      path === "firstname"
        ? `First Name ${nameLengthErr}`
        : `Last Name ${nameLengthErr}`,
    ),
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyMsgErr}`)
    // Validates a standard email address format with a name, @ symbol, domain, and 2+ character TLD.
    .matches(emailRegex)
    .withMessage(`Username Should ${emailRegexErr}`)
    .custom(async (value, { req }) => {
      const user = await getUserByUsername(req.body.username);
      // console.log(
      //   `Custom email validation to check if user with given email already exists, user: ${user}`,
      // );
      if (user) {
        throw new Error(`Email already in use`);
      }
    }),

  body("password")
    .isLength({ min: 5 })
    .withMessage(`password must have minimum length of 5`),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`confirm password must be same as password`),
];
export const registerUser = [
  registerFormValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors);
      return res.status(400).render("index", {
        errors: errors.array(),
      });
    }
    const { firstname, lastname, username, password } = matchedData(req);
    const { admin } = req.body;
    // console.log(Boolean(admin));
    await insertUser(firstname, lastname, username, password, Boolean(admin));
    res.redirect("/login");
  },
];
export const loginUser = [
  loginFormValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", {
        errors: errors.array(),
      });
    }
    const { username, password } = matchedData(req);
    next();
  },
];
export const getLogin = (req, res) => {
  res.render("login");
};
export const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
