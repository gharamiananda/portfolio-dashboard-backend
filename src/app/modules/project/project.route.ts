import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ProjectControllers } from "./project.controller";

const router = express.Router();

router.get("/",
ProjectControllers.getAllProjects);

router.get("/filter-options",

ProjectControllers.getAllFilterOptions);

router.post(
  "/",
  auth(),

  // validateRequest(ProjectValidations.createProjectValidationSchema),
  ProjectControllers.createProject
);

router.get("/:slug",

ProjectControllers.getSingleProject);

router.patch(
  "/:projectId",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  ProjectControllers.updateProject
);


router.delete(
  "/delete-Projects",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  ProjectControllers.deleteProjects
);

export const ProjectRoutes = router;
