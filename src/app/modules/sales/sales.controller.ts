import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SalesServices } from "./sales.service";

const createSales = catchAsync(async (req, res) => {
  const result = await SalesServices.createSalesIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sales  created successfully",
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const Sales = await SalesServices.getAllSalesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales retrieved successfully",
    data: {Sales},

  });
});

const getSingleSales = catchAsync(async (req, res) => {
  const { SalesId } = req.params;
  const result = await SalesServices.getSingleSalesFromDB(SalesId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales is retrieved successfully",
    data: result,
  });
});

const deleteSales = catchAsync(async (req, res) => {
  const { SalesId } = req.params;
  const result = await SalesServices.deleteSalesIntoDB(SalesId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales is Deleted successfully",
    data: result,
  });
});

const updateSales = catchAsync(async (req, res) => {
  const { SalesId } = req.params;
  const result = await SalesServices.updateSalesIntoDB(
    SalesId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales is updated successfully",
    data: result,
  });
});

export const SalesControllers = {
  createSales,
  getAllSales,
  getSingleSales,
  updateSales,
  deleteSales,
};
