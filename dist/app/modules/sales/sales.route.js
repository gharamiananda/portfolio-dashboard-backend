"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const sales_controller_1 = require("./sales.controller");
const sales_validation_1 = require("./sales.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), sales_controller_1.SalesControllers.getAllSales);
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(sales_validation_1.SalesValidations.createSalesValidationSchema), sales_controller_1.SalesControllers.createSales);
router.get("/:SalesId", (0, auth_1.default)(), sales_controller_1.SalesControllers.getSingleSales);
router.patch("/:SalesId", (0, auth_1.default)(), 
//   validateRequest(AcademicSemesterValidations.),
sales_controller_1.SalesControllers.updateSales);
exports.SalesRoutes = router;
