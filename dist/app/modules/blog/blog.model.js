"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date
