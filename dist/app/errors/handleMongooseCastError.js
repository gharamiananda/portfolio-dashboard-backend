"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const handleMongooseCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode: http_status_1.BAD_REQUEST,
        message: "Validation error",
        errorMessage: `${error.value} is not a valid ID!`,
        errorSources,
    };
};
exports.default = handleMongooseCastError;
