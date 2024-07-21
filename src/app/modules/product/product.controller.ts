import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product  created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const Products = await ProductServices.getAllProductsFromDB(req.query);


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: {Products},

  });
});

const getAllFilterOptions = catchAsync(async (req, res) => {
  const Products = await ProductServices.getFilterOptionsFromDB();


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Filter Options retrieved successfully",
    data: {Products},

  });
});


const getSingleProduct = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await ProductServices.getSingleProductFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});

const deleteProducts = catchAsync(async (req, res) => {
  const  productsIds = req.body;
  console.log('req.body :>> ', req.body);
  const result = await ProductServices.deleteProductsIntoDB(productsIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is Deleted successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductIntoDB(
    productId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is updated successfully",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProducts,
  getAllFilterOptions
};
