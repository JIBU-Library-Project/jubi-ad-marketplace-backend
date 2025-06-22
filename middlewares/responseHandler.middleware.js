const responseHandler = (req, res, next) => {
  res.success = (key, value, statusCode = 200, success = true) => {
    return res.status(statusCode).json({
      success,
      status: statusCode,
      [key]: value,
    });
  };

  next();
};

module.exports = responseHandler;
