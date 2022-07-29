"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
