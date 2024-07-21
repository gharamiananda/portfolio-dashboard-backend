"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.get("/", blog_controller_1.BlogControllers.getAllBlogs);
router.get("/filter-options", (0, auth_1.default)(), blog_controller_1.BlogControllers.getAllFilterOptions);
router.post("/", (0, auth_1.default)(), 
// validateRequest(BlogValidations.createBlogValidationSchema),
blog_controller_1.BlogControllers.createBlog);
router.get("/:slug", blog_controller_1.BlogControllers.getSingleBlog);
router.patch("/:BlogId", (0, auth_1.default)(), 
//   validateRequest(AcademicSemesterValidations.),
blog_controller_1.BlogControllers.updateBlog);
router.delete("/delete-Blogs", (0, auth_1.default)(), 
//   validateRequest(AcademicSemesterValidations.),
blog_controller_1.BlogControllers.deleteBlogs);
exports.BlogRoutes = router;
