"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseValidationError = void 0;
const http_status_1 = require("http-status");
const handleMongooseValidationError = (error) => {
    const errorSources = Object.values(error.errors).map((err) => ({
        path: err.path,
        message: err.message,
    }));
    return {
        statusCode: http_status_1.BAD_REQUEST,
        message: 'Validation error',
        errorSources,
    };
};
exports.handleMongooseValidationError = handleMongooseValidationError;
