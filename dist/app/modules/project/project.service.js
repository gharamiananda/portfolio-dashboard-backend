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
exports.ProjectServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const project_model_1 = require("./project.model");
const createProjectIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slugName = payload.name.split(' ').join('-');
    const result = yield project_model_1.Project.create(Object.assign(Object.assign({}, payload), { createdBy: userData._id, slug: slugName }));
    return result;
});
const getAllProjectsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const ProjectQuery = new QueryBuilder_1.default(project_model_1.Project.find(), query)
        .search(['name', 'color'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield ProjectQuery.countTotal();
    const result = yield ProjectQuery.modelQuery;
    return {
        meta,
        result,
    };
    // const result = await Project.find({isDeleted:false}).populate('createdBy');
    // return result;
});
const getSingleProjectFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.findOne({ slug });
    return result;
});
const getFilterOptionsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.aggregate([
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
const deleteProjectsIntoDB = (ProjectSlugs) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('ProjectSlugs :>> ', ProjectSlugs);
    const result = yield project_model_1.Project.updateMany({
        slug: {
            $in: ProjectSlugs
        }
    }, {
        $set: { isDeleted: true }
    }, { upsert: true, multi: true });
    return result;
});
const updateProjectIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.Project.findByIdAndUpdate(id, payload);
    return result;
});
exports.ProjectServices = {
    createProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    deleteProjectsIntoDB,
    updateProjectIntoDB,
    getFilterOptionsFromDB
};
