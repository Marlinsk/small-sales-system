import express from 'express';
import cors from 'cors';

import { connectMongodb } from './shared/config/database/VerifyConnectionDB';
import { connectRabbitMq } from './shared/config/rabbitmq/rabbitConfig';
import router from './modules/sales/routes';
import checkToken from './shared/config/auth/CheckToken';

const app = express();

connectMongodb();
connectRabbitMq();

app.use(cors());
app.use(express.json());

app.use(checkToken);

app.use(router);

app.get("/api/status", (request, response) => {
  return response.status(200).json({
    service: 'Sales backend application',
    status: 'up',
    httpStatus: 200  
  });
});

app.listen(8082, () => {
  console.log(`Server starting successfully at 🚀 http://localhost:${8082}`);
});