const customError = (statusCode, message) => {
  // return res.status(statusCode).json({
  //   success: false,
  //   status: statusCode,
  //   message: message,
  // });
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export default customError;
