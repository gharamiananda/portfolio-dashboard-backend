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
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query); // copy
        // Filtering
        const excludeFields = ['searchTerm', 'sortBy', 'limit', 'page', 'fields', 'minPrice', 'maxPrice', 'tags', 'level', 'startDate', 'endDate', 'sales', 'toDate', 'fromDate', 'types', 'sizes', 'fragrances', 'productStock', 'undefined', 'bloomToDate', 'bloomFromDate'];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (this.query.minPrice !== undefined && this.query.maxPrice === undefined) {
            queryObj.price = { $gte: Number(this.query.minPrice) };
        }
        if (this.query.productStock) {
            queryObj.quantity = { $gte: 1 };
            if (this.query.productStock === "Out Of Stock") {
                queryObj.quantity = { $eq: 0 };
            }
        }
        if (this.query.types !== undefined) {
            queryObj.type = { $in: JSON.parse(this.query.types) };
        }
        if (this.query.sizes !== undefined) {
            queryObj.size = { $in: JSON.parse(this.query.sizes) };
        }
        if (this.query.fragrances !== undefined) {
            queryObj.fragrance = { $in: JSON.parse(this.query.fragrances) };
        }
        if (this.query.maxPrice !== undefined) {
            queryObj.price = { $gte: Number(this.query.minPrice || 0), $lte: Number(this.query.maxPrice) };
        }
        const tags = { isDeleted: false };
        if (this.query.tags) {
            tags.name = this.query.tags;
            queryObj.tags = { $elemMatch: tags };
        }
        if (this.query.tags) {
            tags.name = this.query.tags;
            queryObj.tags = { $elemMatch: tags };
        }
        const today = new Date();
        if (this.query.fromDate && this.query.toDate) {
            const fromDate = new Date(this.query.fromDate);
            const toDate = new Date(this.query.toDate);
            toDate.setDate(toDate.getDate() + 1); //
            queryObj.soldDate = { $gte: fromDate, $lte: toDate };
        }
        if (this.query.bloomFromDate && this.query.bloomToDate) {
            const bloomFromDate = new Date(this.query.bloomFromDate);
            const bloomToDate = new Date(this.query.bloomToDate);
            bloomToDate.setDate(bloomToDate.getDate() + 1); //
            queryObj.bloomDate = { $gte: bloomFromDate, $lte: bloomToDate };
        }
        if (this.query.sales) {
            switch (this.query.sales) {
                case 'Weekly':
                    queryObj.soldDate = { $gte: today.setDate(today.getDate() - 7) };
                    break;
                case 'Daily':
                    today.setHours(0, 0, 0, 0);
                    queryObj.soldDate = { $gte: today };
                    break;
                case 'Monthly':
                    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    queryObj.soldDate = { $gte: firstDayOfMonth, $lte: lastDayOfMonth };
                    break;
                case 'Yearly':
                    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
                    const lastDayOfYear = new Date(today.getFullYear() + 1, 0, 0);
                    queryObj.soldDate = { $gte: firstDayOfYear, $lte: lastDayOfYear };
                    break;
                default:
                    break;
            }
        }
        if (this.query.level) {
            queryObj['details.level'] = this.query.level;
        }
        if (this.query.startDate !== undefined) {
            queryObj.startDate = { $gte: this.query.startDate };
        }
        if (this.query.endDate !== undefined) {
            if (!queryObj.startDate) {
                queryObj.startDate = {};
            }
            queryObj.startDate.$lte = this.query.endDate;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
