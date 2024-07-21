"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesValidations = void 0;
const zod_1 = require("zod");
const createSalesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        nameOfBuyer: zod_1.z.string(),
        soldQuantity: zod_1.z.number(),
        product: zod_1.z.string(),
        soldDate: zod_1.z.string()
    }),
});
const updateCourseValidationSchema = zod_1.z.object({});
exports.SalesValidations = {
    createSalesValidationSchema,
    updateCourseValidationSchema,
};
// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: Date
