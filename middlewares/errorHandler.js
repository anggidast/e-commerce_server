const errorHandler = (err, req, res, next) => {
  let statusCode;
  let errorMsg;

  console.log(err);

  switch (err.name) {
    case 'JsonWebTokenError':
    case 'TokenMissing':
      statusCode = 401;
      errorMsg = 'Token invalid/missing, please re-login';
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      // errorMsg = `Email ${req.body.email} is already registered`;
      errorMsg = err.message;
      break;
    case 'SequelizeValidationError':
      statusCode = 400;
      errorMsg = err.errors[0].message || err.message;
      break;
    case 'BadRequest':
      statusCode = 400;
      errorMsg = err.message;
      break;
    case 'LoginError':
      statusCode = 403;
      errorMsg = err.message;
      break;
    case 'NotFound':
      statusCode = 404;
      errorMsg = err.message;
      break;
    case 'SequelizeForeignKeyConstraintError':
      statusCode = 404;
      errorMsg = 'Product not found';
      break;
    case 'Unauthorized':
      statusCode = 401;
      errorMsg = err.message;
      break;
    default:
      statusCode = 500;
      errorMsg = 'Internal server error';
      break;
  }
  res.status(statusCode).json({ message: errorMsg });
};

module.exports = errorHandler;
