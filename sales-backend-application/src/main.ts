import cors from 'cors';
import express from 'express';

import { PORT } from './shared/constants/secrets';
import { CONTAINER_ENV } from './shared/constants';
import { connectMongodb } from './shared/config/database/VerifyConnectionDB';
import { connectRabbitMq } from './shared/config/rabbitmq/rabbitConfig';

import router from './modules/sales/routes';
import checkToken from './shared/config/auth/CheckToken';
import tracing from './shared/config/tracing'; 

const THREE_MINUTES = 180000;

const app = express();

async function startApplication() {
  if (CONTAINER_ENV === process.env.NODE_ENV) {
    console.info("Waiting for RabbitMQ and MongoDB containers to start...");
    setInterval(() => {
      connectMongodb();
      connectRabbitMq();
    }, THREE_MINUTES);
  } else {
    connectMongodb();
    connectRabbitMq();
  }
}

startApplication();

app.use(cors());
app.use(express.json());
app.use(checkToken);
app.use(router);
app.use(tracing);

app.get("/api/status", (request, response) => {
  return response.status(200).json({
    service: 'Sales backend application',
    status: 'up',
    httpStatus: 200  
  });
});

app.listen(PORT, () => {
  console.log(`Server starting successfully at 🚀 http://localhost:${8082}`);
});