import amqp, { Channel, Connection } from "amqplib/callback_api";

import { listenToSalesConfirmationQueue } from "../../../modules/sales/infra/rabbitmq/SalesConfirmationListener";

import { 
  PRODUCT_STOCK_UPDATE_QUEUE, 
  PRODUCT_STOCK_UPDATE_ROUTING_KEY, 
  PRODUCT_TOPIC, SALES_CONFIRMATION_QUEUE, 
  SALES_CONFIRMATION_ROUTING_KEY 
} from "./queue";

import { RABBIT_MQ_URL } from "../../constants/secrets";

const TWO_SECONDS = 2000;
const HALF_MINUTES = 30000;
const CONTAINER_ENV = "container";

interface QueueParams {
  connection: Connection;
  queue: string;
  routingKey: string;
  topic: string;
}

export async function connectRabbitMq() {
  const env = process.env.NODE_ENV;
  if (CONTAINER_ENV === env) {
    console.info("Waiting for RabbitMQ to start...");
    setInterval(() => {
      connectRabbitMqAndCreateQueues();
    }, HALF_MINUTES);
  } else {
    connectRabbitMqAndCreateQueues();
  }
}

function connectRabbitMqAndCreateQueues() {
  amqp.connect(RABBIT_MQ_URL, (error: Error, connection: Connection) => {
    if (error) {
      throw error;
    }
    console.info("Starting Rabbitmq...");
    createQueue({
      connection,
      queue: PRODUCT_STOCK_UPDATE_QUEUE,
      routingKey: PRODUCT_STOCK_UPDATE_ROUTING_KEY,
      topic: PRODUCT_TOPIC,
    });
    createQueue({
      connection,
      queue: SALES_CONFIRMATION_QUEUE,
      routingKey: SALES_CONFIRMATION_ROUTING_KEY,
      topic: PRODUCT_TOPIC, 
    });
    console.info("Queues and topics were defined.");
    setTimeout(function () {
      connection.close();
    }, TWO_SECONDS);
  });
  setTimeout(function () {
    listenToSalesConfirmationQueue();
  }, TWO_SECONDS);
}

function createQueue({ connection, queue, routingKey, topic }: QueueParams) {
  connection.createChannel((channelError: Error, channel: Channel) => {
    if (channelError) {
      throw channelError;
    }
    channel.assertExchange(topic, "topic", { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, topic, routingKey);
  })
}
