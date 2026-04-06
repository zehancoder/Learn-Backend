export const authController = async (req, res, next) => {
  try {
    throw new Error("Has an error when register");
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
