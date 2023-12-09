import "dotenv/config";

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import Exception from "@shared/exceptions/Exception";
import tracing from "@shared/middlewares/tracing";

import { PORT } from "@shared/constants/secret";
import { CONTAINER_ENV } from "@shared/constants";

import { initialData } from "@infra/database/mocks/InitialData";
import userRouter from "@infra/http/routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());

function startApplication() {
  if (process.env.NODE_ENV === CONTAINER_ENV) {
    initialData();
  }
}

startApplication();

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

app.use(tracing);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(
    `Server starting successfully at 🚀 http://localhost:${8080}`
  );
});