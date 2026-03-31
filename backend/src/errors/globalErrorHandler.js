export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //   Send response to client
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};
