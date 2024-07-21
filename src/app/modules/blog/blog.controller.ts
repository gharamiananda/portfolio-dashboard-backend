import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog  created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const Blogs = await BlogServices.getAllBlogFromDB(req.query);


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs retrieved successfully",
    data: {Blogs},

  });
});

const getAllFilterOptions = catchAsync(async (req, res) => {
  const Blogs = await BlogServices.getFilterOptionsFromDB();


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Filter Options retrieved successfully",
    data: {Blogs},

  });
});


const getSingleBlog = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is retrieved successfully",
    data: result,
  });
});

const deleteBlogs = catchAsync(async (req, res) => {
  const  blogsIds = req.body;
  console.log('req.body :>> ', req.body);
  const result = await BlogServices.deleteBlogIntoDB(blogsIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is Deleted successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { BlogId } = req.params;
  const result = await BlogServices.updateBlogIntoDB(
    BlogId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is updated successfully",
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlogs,
  getAllFilterOptions
};
