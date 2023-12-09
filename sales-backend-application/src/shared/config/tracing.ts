import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

import { BAD_REQUEST } from "../constants/https-status"; 

export default (
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  let { transactionid } = request.headers;
  if (transactionid === undefined) {
    return response.status(BAD_REQUEST).json({ 
      status: BAD_REQUEST, 
      message: 'The transactionid header is required.' 
    });
  }
  request.headers.serviceid = uuidv4();
  return next();
}