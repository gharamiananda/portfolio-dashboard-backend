import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.get("/",
BlogControllers.getAllBlogs);

router.get("/filter-options",
auth(),

BlogControllers.getAllFilterOptions);

router.post(
  "/",
  auth(),

  // validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog
);

router.get("/:slug",

BlogControllers.getSingleBlog);

router.patch(
  "/:BlogId",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  BlogControllers.updateBlog
);


router.delete(
  "/delete-Blogs",
  auth(),

  //   validateRequest(AcademicSemesterValidations.),
  BlogControllers.deleteBlogs
);

export const BlogRoutes = router;
