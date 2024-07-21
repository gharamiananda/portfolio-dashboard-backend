"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const project_controller_1 = require("./project.controller");
const router = express_1.default.Router();
router.get("/", project_controller_1.ProjectControllers.getAllProjects);
router.get("/filter-options", project_controller_1.ProjectControllers.getAllFilterOptions);
router.post("/", (0, auth_1.default)(), 
// validateRequest(ProjectValidations.createProjectValidationSchema),
project_controller_1.ProjectControllers.createProject);
router.get("/:slug", project_controller_1.ProjectControllers.getSingleProject);
router.patch("/:projectId", (0, auth_1.default)(), 
//   validateRequest(AcademicSemesterValidations.),
project_controller_1.ProjectControllers.updateProject);
router.delete("/delete-Projects", (0, auth_1.default)(), 
//   validateRequest(AcademicSemesterValidations.),
project_controller_1.ProjectControllers.deleteProjects);
exports.ProjectRoutes = router;
