const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      // Log the error for debugging purposes
      console.error(err);
  
      // Ensure status code is a valid HTTP status code
      const statusCode = (err.code >= 100 && err.code <= 599) ? err.code : 500;
  
      // Send the error response
      res.status(statusCode).json({
        message: err.message || 'An unknown error occurred!',
        success: false,
      });
      
      // Optionally, call next with the error if you want to pass it to other error handlers
      // next(err);
    }
  };
  
  export default asyncHandler;
  