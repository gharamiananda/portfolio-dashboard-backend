import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    color: z.string(),
    type: z.string(),
    size: z.string(),
    fragrance: z.string(),
    bloomDate: z.string()

  }),
});

const updateCourseValidationSchema = z.object({});

export const ProductValidations = {
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