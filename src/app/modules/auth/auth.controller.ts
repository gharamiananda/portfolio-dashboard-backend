import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully',
    data: result,
  });
});



const register = catchAsync(async (req, res) => {
  const result= await AuthServices.register(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});



export const AuthControllers = {
  loginUser,
  register
};
