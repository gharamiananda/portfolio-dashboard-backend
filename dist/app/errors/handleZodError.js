"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const http_status_1 = require("http-status");
const handleZodError = (error) => {
    const errorSources = error.issues.map((err) => ({
        path: err.path[err.path.length - 1],
        message: err.message,
    }));
    const allFields = {};
    errorSources
        .forEach((field) => {
        allFields[field.path] = `${allFields[field.path]} is required`;
    });
    const errorMessage = Object.keys(allFields)
        .map((field) => field + " is required.")
        .join(" ");
    return {
        statusCode: http_status_1.BAD_REQUEST,
        message: "Validation error",
        errorMessage,
        errorSources,
    };
};
exports.handleZodError = handleZodError;
