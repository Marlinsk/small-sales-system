import amqp, { Channel, Connection } from "amqplib/callback_api";

import { RABBIT_MQ_URL } from "../../../shared/constants/secrets";
import { PRODUCT_TOPIC, PRODUCT_STOCK_UPDATE_ROUTING_KEY } from "../../../shared/config/rabbitmq/queue";

export function sendMessageToProductStockUpdateQueue(message: Object) {
  amqp.connect(RABBIT_MQ_URL, (error: Error, connection: Connection) => {
    if (error) {
      throw error;
    }
    connection.createChannel((channelError: Error, channel: Channel) => {
      if (channelError) {
        throw channelError;
      }

      let jsonStringMessage = JSON.stringify(message);
      console.info(`Sending message to product update stock: ${jsonStringMessage}`);
      channel.publish(
        PRODUCT_TOPIC,
        PRODUCT_STOCK_UPDATE_ROUTING_KEY,
        Buffer.from(jsonStringMessage)
      );
      console.info("Message was sent successfully!");
    })
  });
}