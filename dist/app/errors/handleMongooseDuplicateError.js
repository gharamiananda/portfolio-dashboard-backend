"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMongooseDuplicateError = void 0;
const http_status_1 = require("http-status");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMongooseDuplicateError = (error) => {
    const allkeys = Object.keys(error.keyPattern);
    const errorMessage = [];
    const errorSources = allkeys.map((path) => {
        errorMessage.push(path);
        return ({
            path: path,
            message: 'Duplicate data',
        });
    });
    return {
        statusCode: http_status_1.BAD_REQUEST,
        message: `Duplicate data on ${errorMessage.join(', ')}`,
        errorSources,
    };
};
exports.handleMongooseDuplicateError = handleMongooseDuplicateError;
