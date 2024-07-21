import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';


const auth = () => {
   
  return catchAsync (async  (req: Request, res: Response, next: NextFunction) => {
   
    const token = req.headers.authorization;
    if(!token) {
       throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized Access','data statusCode')
    }


const decoded = await jwt.verify(token,config.jwt_access_secret as string) as JwtPayload;
const {_id,iat}=decoded

const user = await User.findById(_id);



// checking if the user is exist

if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!','data statusCode');
}
    
    req.user=decoded as JwtPayload;

next()
    
  })
};

export default auth;