"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const resSendData = {
        success: data.success,
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        message: data.message,
        data: data.data,
    };
    if (data.meta) {
        resSendData.meta = data.meta;
        resSendData.data = data.data;
    }
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(resSendData);
};
exports.default = sendResponse;
