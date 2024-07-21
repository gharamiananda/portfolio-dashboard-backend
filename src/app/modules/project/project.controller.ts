import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProjectIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project  created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const Projects = await ProjectServices.getAllProjectsFromDB(req.query);


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: {Projects},

  });
});

const getAllFilterOptions = catchAsync(async (req, res) => {
  const Projects = await ProjectServices.getFilterOptionsFromDB();


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Filter Options retrieved successfully",
    data: {Projects},

  });
});


const getSingleProject = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await ProjectServices.getSingleProjectFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project is retrieved successfully",
    data: result,
  });
});

const deleteProjects = catchAsync(async (req, res) => {
  const  projectsIds = req.body;
  console.log('req.body :>> ', req.body);
  const result = await ProjectServices.deleteProjectsIntoDB(projectsIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project is Deleted successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await ProjectServices.updateProjectIntoDB(
    projectId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project is updated successfully",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProjects,
  getAllFilterOptions
};
