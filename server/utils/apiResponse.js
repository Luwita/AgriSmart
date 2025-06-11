export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export const sendResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json(new ApiResponse(statusCode, data, message));
};

export const sendError = (res, statusCode, message, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    statusCode
  });
};