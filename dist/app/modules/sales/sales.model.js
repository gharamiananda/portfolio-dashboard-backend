"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const mongoose_1 = require("mongoose");
const salesSchema = new mongoose_1.Schema({
    nameOfBuyer: {
        type: String,
        required: true,
    }, soldQuantity: {
        type: Number,
        required: true,
    },
    soldDate: {
        type: Date,
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});
exports.Sales = (0, mongoose_1.model)("Sales", salesSchema);
// nameOfBuyer: string
// soldQuantity : number
// date:  Date
