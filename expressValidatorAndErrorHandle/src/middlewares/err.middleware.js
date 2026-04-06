import dotenv from "dotenv";
dotenv.config();
const errMiddleware = (error, req, res, next) => {
  const response = {
    message: error.message,
  };
  if (process.env.NODE_ENVIRONMENT === "development") {
    response.stack = error.stack;
  }
  res.status(error.status).json(response);
};
export default errMiddleware;
