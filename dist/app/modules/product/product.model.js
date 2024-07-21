"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
        type: String
    },
    images: [String],
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }, isDeleted: {
        type: Boolean,
        default: false,
    }, color: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }, size: {
        type: String,
        required: true,
    }, fragrance: {
        type: String,
        required: true,
    },
    bloomDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date
