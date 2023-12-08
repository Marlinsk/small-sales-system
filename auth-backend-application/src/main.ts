import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import Exception from "@shared/exceptions/Exception";
import routes from "@shared/infra/http/routes";
import tracing from "@shared/infra/http/middlewares/tracing";

import { initialData } from "@infra/database/prisma/mocks/InitialData";

import "@shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

initialData();

app.use(tracing);

app.get("/api/status", (request, response) => {
  return response.status(200).json({
    service: 'Auth backend application',
    status: 'up',
    httpStatus: 200  
  });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Exception) {
    return response
      .status(err.status)
      .json({ 
        status: err.status, 
        message: err.message 
      });
  }

  console.error(err);

  return response
    .status(500)
    .json({ 
      status: "error", 
      message: "Internal server error" 
    });
});

app.listen(8080, () => {
  console.log(
    `Server starting successfully at 🚀 http://localhost:${8080}`
  );
});