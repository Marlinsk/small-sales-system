export const API_SECRET = process.env.JWT_SECRET 
  ? process.env.JWT_SECRET 
  : "MjgxMDExZTYtNWQ4OS00NWI5LTg0OGMtYjVhZTI0OWIzYmM2";

export const RABBIT_MQ_URL = process.env.RABBIT_MQ_URL 
  ? process.env.RABBIT_MQ_URL 
  : "amqp://localhost:5672";

export const PRODUCT_API_URL = process.env.PRODUCT_API_URL 
  ? process.env.PRODUCT_API_URL 
  : "http://localhost:8081/api/product";