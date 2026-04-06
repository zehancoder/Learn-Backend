import { body, validationResult } from "express-validator";
const validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }
  res.status(400).json({
    error: error.array(),
  });
};

export const expressValidators = [
  body("username").isString().withMessage("username is must be required"),
  body("email").isEmail().withMessage("email should be valid email"),
  body("password").custom((value) => {  // custom password validator
    if (value.length < 6) {
      throw new Error("Password should be atleast 6 character");
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(value)) {
      throw new Error(
        "Password Should be contain at least one uppercase letter and one number",
      );
    }
    return true;
  }),
  validate,
];
