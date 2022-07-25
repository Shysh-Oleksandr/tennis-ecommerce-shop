import { NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: any,
  res: any,
  next: NextFunction
) => {
  switch (err.name) {
    case "UnauthorizedError":
      return res.status(401).json({
        message: "The user is not authorized",
      });
    case "ValidationError":
      return res.status(401).json({
        message: err,
      });

    default:
      return res.status(500).json({
        message: err.name,
      });
  }
};
