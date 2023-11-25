import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (request, response) => {
  return response.status(200).json({
    service: 'Auth backend application',
    status: 'up',
    httpStatus: 200  
  });
});

app.listen(8080, () => {
  console.log(`Server starting successfully at 🚀 http://localhost:${8080}`);
});