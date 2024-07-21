"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.number(),
        quantity: zod_1.z.number(),
        color: zod_1.z.string(),
        type: zod_1.z.string(),
        size: zod_1.z.string(),
        fragrance: zod_1.z.string(),
        bloomDate: zod_1.z.string()
    }),
});
const updateCourseValidationSchema = zod_1.z.object({});
exports.ProductValidations = {
    createProductValidationSchema,
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
