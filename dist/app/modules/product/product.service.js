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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createProductIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slugName = payload.name.split(' ').join('-');
    const result = yield product_model_1.Product.create(Object.assign(Object.assign({}, payload), { createdBy: userData._id, slug: slugName }));
    return result;
});
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find({ isDeleted: false })
        .populate('createdBy'), query)
        .search(['name', 'color'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return {
        meta,
        result,
    };
    // const result = await Product.find({isDeleted:false}).populate('createdBy');
    // return result;
});
const getSingleProductFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ slug });
    return result;
});
const getFilterOptionsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.aggregate([
        {
            $group: {
                _id: null,
                types: { $addToSet: "$type" },
                sizes: { $addToSet: "$size" },
                colors: { $addToSet: "$color" },
                fragrances: { $addToSet: "$fragrance" }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field from the result
                types: 1,
                sizes: 1,
                colors: 1,
                fragrances: 1
            }
        }
    ]);
    return result;
});
const deleteProductsIntoDB = (productSlugs) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('productSlugs :>> ', productSlugs);
    const result = yield product_model_1.Product.updateMany({
        slug: {
            $in: productSlugs
        }
    }, {
        $set: { isDeleted: true }
    }, { upsert: true, multi: true });
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload);
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductsIntoDB,
    updateProductIntoDB,
    getFilterOptionsFromDB
};
