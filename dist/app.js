"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
// Define the whitelist
const whitelist = [
    'http://localhost:3333',
    'http://localhost:3000',
    'http://localhost:3334',
    'http://localhost:3001',
    'http://knighthunt-website-admin.s3-website.ap-south-1.amazonaws.com',
    'http://knighthunt-website.s3-website.ap-south-1.amazonaws.com',
    'http://knighthunt-admin.techwens.in',
    'http://knighthunt.techwens.in'
];
// Define the CORS options
const corsOptions = {
    origin(origin, callback) {
        if (true) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
// Use the CORS middleware with custom options
app.use((0, cors_1.default)(corsOptions));
// app.use(cors({ credentials: true }));
// application routes
app.get("/", (req, res) => {
    res.status(200).json("Welcome to Flower Api store");
});
app.use("/api", routes_1.default);
app.use(globalErrorHandler_1.default);
//Not Found
app.use(notFound_1.default);
exports.default = app;
