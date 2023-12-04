import amqp, { Channel, Connection } from "amqplib/callback_api";

import { SALES_CONFIRMATION_QUEUE } from "../../../../shared/config/rabbitmq/queue";

import { RABBIT_MQ_URL } from "../../../../shared/constants/secrets";

export function listenToSalesConfirmationQueue() {
  amqp.connect(RABBIT_MQ_URL, (error: Error, connection: Connection) => {
    if (error) {
      throw error;
    }
    console.info("Listening to Sales Confirmation Queue...");
    connection.createChannel((channelError: Error, channel: Channel) => {
      if (channelError) {
        throw channelError;
      }
      channel.consume(
        SALES_CONFIRMATION_QUEUE, 
        (message) => {
          console.info(
            `Receiving message from queue: ${message?.content.toString()}`
          );
        }, 
        { 
          noAck: true 
        }
      );
    })
  });
}