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
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slugName = payload.name.split(' ').join('-');
    const result = yield blog_model_1.Blog.create(Object.assign(Object.assign({}, payload), { createdBy: userData._id, slug: slugName }));
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(blog_model_1.Blog.find(), query)
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
    // const result = await Blog.find({isDeleted:false}).populate('createdBy');
    // return result;
});
const getSingleBlogFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findOne({ slug });
    return result;
});
const getFilterOptionsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.aggregate([
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
const deleteBlogIntoDB = (productSlugs) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('productSlugs :>> ', productSlugs);
    const result = yield blog_model_1.Blog.updateMany({
        slug: {
            $in: productSlugs
        }
    }, {
        $set: { isDeleted: true }
    }, { upsert: true, multi: true });
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload', payload);
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload);
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogFromDB,
    getSingleBlogFromDB,
    deleteBlogIntoDB,
    updateBlogIntoDB,
    getFilterOptionsFromDB
};
