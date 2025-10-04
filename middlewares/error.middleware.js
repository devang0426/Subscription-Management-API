const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err }; // Clone the original error
    error.message = err.message;

    console.error(err);

    // MongoDB CastError (usually due to an invalid ObjectId)
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message); // Create new error object
      error.statusCode = 404;
    }

    // Mongoose Duplicate Key Error (likely from a unique constraint violation)
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 409; // Conflict error (409 is better for duplicate data)
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(val => val.message).join(", ");
      error = new Error(message); // Construct the error message
      error.statusCode = 400; // Bad request for validation issues
    }

    // Send the response
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server error",
    });
  } catch (err) {
    next(err); // Call next middleware in case of a failure in this error handler
  }
};

export default errorMiddleware;
