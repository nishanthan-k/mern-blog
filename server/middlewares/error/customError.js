const customError = (statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};

export default customError;