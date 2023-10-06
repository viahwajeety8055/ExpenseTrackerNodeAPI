// middleware/errorHandlerMiddleware.js
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific types of errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle other errors
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandlerMiddleware;
