const errorHandler = (error, req, res, next) => {
  if (error.code === 11000) {
    // MongoDB duplicate key error
    return res.status(400).json({
      success: false,
      message: "Duplicate Key Error",
      key: error.keyValue,
    });
  }

  // For other types of errors
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    error: error,
  });
};

export default errorHandler;
