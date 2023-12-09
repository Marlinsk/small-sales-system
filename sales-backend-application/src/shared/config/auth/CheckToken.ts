import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import Exception from "../../exceptions/Exception";

import * as secret from "../../constants/secrets";
import * as httpStatus from "../../constants/https-status";

export default async function checkToken(
  request: Request, 
  response: Response, 
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new Exception(
        "Access token was not informed", 
        httpStatus.UNAUTHORIZED
      );
    }
    
    const accessToken = authorization;  
    const [, token] = accessToken.split(" ");
    const { JWT_SECRET } = secret;
    
    if (!JWT_SECRET) {
      throw new Exception(
        "Secret is not defined on the configuration.", 
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { sub: string, name: string, email: string };

    request.user = {
      id: String(decoded.sub),
      name: decoded.name,
      email: decoded.email
    } 
    
    return next();  
  } catch (error: any) {
    const status = error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR;
    
    return response.status(status).json({
      message: error.message,
    });
  }
}