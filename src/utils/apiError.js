class apiError extends Error {
  constructor(
    status,
    message = "Something Went Wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.status = (status >= 100 && status <= 599) ? status : 500; // Default to 500 if invalid
    this.data = null;
    this.errors = errors;
    this.message = message;
    this.success = false;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
