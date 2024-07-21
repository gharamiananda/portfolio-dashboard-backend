"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesServices = void 0;
const sales_model_1 = require("./sales.model");
const product_model_1 = require("../product/product.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createSalesIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield product_model_1.Product.findById(payload.product);
    if (!findProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product Not Found', 'data statusCode');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //step1: basic product info update
        const updatedProductInfo = yield product_model_1.Product.findOneAndUpdate({ slug: findProduct.slug }, { $inc: { quantity: -payload.soldQuantity } }, {
            new: true,
            runValidators: true,
            session,
        });
        console.log('findProduct', findProduct);
        if (!updatedProductInfo) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update Product');
        }
        // console.log('updatedProductInfo', updatedProductInfo)
        const createSales = yield sales_model_1.Sales.create(Object.assign(Object.assign({}, payload), { totalPrice: payload.soldQuantity * findProduct.price }));
        if (!createSales) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create Sales');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return { updatedProductInfo };
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to Create Sales');
    }
});
const getAllSalesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const salesQuery = new QueryBuilder_1.default(sales_model_1.Sales.find()
        .populate('product'), query)
        .search(['nameOfBuyer'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield salesQuery.countTotal();
    const result = yield salesQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleSalesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findById(id);
    return result;
});
const deleteSalesIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return result;
});
const updateSalesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.Sales.findByIdAndUpdate(id, payload);
    return result;
});
exports.SalesServices = {
    createSalesIntoDB,
    getAllSalesFromDB,
    getSingleSalesFromDB,
    deleteSalesIntoDB,
    updateSalesIntoDB,
};
