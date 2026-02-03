import { ErrorRequestHandler } from "express";

const globalErrorHandle: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
  });
};

export default globalErrorHandle;
