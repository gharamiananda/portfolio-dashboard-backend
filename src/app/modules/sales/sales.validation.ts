import { z } from "zod";

const createSalesValidationSchema = z.object({
  body: z.object({
    nameOfBuyer: z.string(),
    soldQuantity: z.number(),
    product: z.string(),
    soldDate: z.string()

  }),
});

const updateCourseValidationSchema = z.object({});

export const SalesValidations = {
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