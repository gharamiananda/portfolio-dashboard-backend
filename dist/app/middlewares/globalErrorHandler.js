"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleMongooseValidationError_1 = require("../errors/handleMongooseValidationError");
const handleMongooseCastError_1 = __importDefault(require("../errors/handleMongooseCastError"));
const handleMongooseDuplicateError_1 = require("../errors/handleMongooseDuplicateError");
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleZodError_1 = require("../errors/handleZodError");
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler = (error, req, res, next) => {
    var _a;
    let errorSources = [
        {
            path: "",
            message: "",
        },
    ];
    let statusCode = 500;
    let message = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!";
    let errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!";
    let errorFields = ['message', 'data', 'errorMessage', 'errorDetails', 'stack', 'statusCode'];
    if (error.name === 'jwt expired' || error.name === "TokenExpiredError" || ((_a = error.name) === null || _a === void 0 ? void 0 : _a.includes('Token'))) {
        statusCode = 401; // Default to Unauthorized
        message = "Unauthorized Access";
        errorFields = errorFields.filter((el) => 'data' !== el);
    }
    else if (error.name === "ZodError" && error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.name === "ValidationError") {
        const simplifiedError = (0, handleMongooseValidationError_1.handleMongooseValidationError)(error);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (error.name === "CastError") {
        const simplifiedError = (0, handleMongooseCastError_1.default)(error);
        message = "Invalid Id";
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error.code === 11000) {
        const simplifiedError = (0, handleMongooseDuplicateError_1.handleMongooseDuplicateError)(error);
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
        statusCode = simplifiedError.statusCode;
    }
    else if (error instanceof AppError_1.default) {
        errorSources = [{ path: "", message: error.message }];
        statusCode = error.statusCode;
        if (error === null || error === void 0 ? void 0 : error.excludeFields) {
            errorFields = errorFields.filter((el) => { var _a, _b; return !((_b = (_a = error === null || error === void 0 ? void 0 : error.excludeFields) === null || _a === void 0 ? void 0 : _a.split(' ')) === null || _b === void 0 ? void 0 : _b.includes(el)); });
            error === null || error === void 0 ? true : delete error.excludeFields;
        }
    }
    else if (error instanceof Error) {
        errorSources = [{ path: "", message: error.message }];
        errorFields = errorFields.filter((el) => 'data' !== el);
    }
    const myObject = {
        statusCode,
        message,
        errorMessage: statusCode === http_status_1.default.UNAUTHORIZED ? "You do not have the necessary permissions to access this resource." : errorMessage,
        errorDetails: statusCode === http_status_1.default.UNAUTHORIZED ? null : error,
        stack: statusCode === http_status_1.default.UNAUTHORIZED ? null : error.stack,
        data: null
    };
    console.log('error?.name', error === null || error === void 0 ? void 0 : error.name);
    const errorResponseObject = {};
    errorFields.forEach(key => {
        if (Object.keys(myObject).includes(key)) {
            errorResponseObject[key] = myObject[key];
        }
    });
    return res.status(statusCode).json(Object.assign({ success: false, errorSources }, errorResponseObject));
};
exports.default = globalErrorHandler;
