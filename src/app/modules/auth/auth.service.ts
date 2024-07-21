import httpStatus, { BAD_REQUEST } from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import bcrypt from 'bcrypt'
import jwt,{ JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { TUser } from '../user/user.interface';

const  loginUser = async (payload:TUserLogin) => {
 // checking if the user is exist

 const user = await User.isUserExistsByEmail(payload.email);

 if (!user) {
   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !','data');
   
 }


 //checking if the password is correct

 if (!(await User.isPasswordMatched(payload?.password, user?.password))){

   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched','data');
   
 }

 //create token and sent to the  client
 

 const jwtPayload = {
   _id:user?._id ,
   email:user.email,

 };


 const token = createToken(
   jwtPayload,
   config.jwt_access_secret as string,
   config.jwt_access_expires_in as string
 );


 return {
   token,user
 };

// return user

};




const  register = async (payload: TUser) => {
      const newUser = await User.create({...payload, passwordChangeAt:new Date()});
        return newUser;
  
  
 };

export const AuthServices = {
  loginUser,
  register
};
