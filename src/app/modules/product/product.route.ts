import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";

const router = express.Router();

router.get("/",
auth(),
ProductControllers.getAllProducts);

router.get("/filter-options",
auth(),

ProductControllers.getAllFilterOptions);

router.post(
  "/",
  auth(),

  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

router.get("/:slug",
auth(),

ProductControllers.getSingleProduct);

router.patch(
  "/:productId",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  ProductControllers.updateProduct
);


router.delete(
  "/delete-products",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  ProductControllers.deleteProducts
);

export const ProductRoutes = router;
