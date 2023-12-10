# Sales System
Sales management system developed using the microservices architecture and technologies such as **Java, Spring Boot, Javascript + Typescript, Node.js, Rabbitmq, Docker.**

The project was developed for study purposes in terms of concept, functionality, applicability, and scenarios where this type of architecture fits, such as banks, customer service, and e-commerce.

## Technologies
The applications of this project use:
- Java 17
- Spring Boot 3
- Spring Cloud OpenFeign
- Apache Maven
- Javascript
- Typescript
- Node.js 19
- Express.js
- Babel (Build generator)
- Sequelize (Object-Relational Mapping)
- MongoDB (Container e Cloud MongoDB)
- PostgreSQL (Container)
- RabbitMQ (Container)
- API REST
- Docker
- docker-compose
- JWT
- Axios

## Architecture
The project was developed following the architecture below:

<p align="center">
  <img alt="architecture" src="assets/Architecture.drawio.png" width="100%">
</p>

## In-depth description of the application
The applications communicate with each other to execute the authentication validation process and update the status of a product sales order in the database. Much of this communication takes place between the **Product API** and **Sales API,** which complement each other. 

The **Product API** is responsible for product management, while the **Sales API** handles order placement.

### Tech descripiton of applications
- **Auth-API:** Authentication API with Node.js 19, Express.js, Typescript, Sequelize, PostgreSQL, JWT, Bcryptjs, Babel.
- **Sales-API:** Sales API with Node.js 19, Express.js, Typescript, MongoDB, Mongoose, Babel, JWT validation, RabbitMQ, and Axios for HTTP clients.
- **Product-API:** Product API with Java 17, Spring Boot, Spring Data JPA, PostgreSQL, JWT validation, RabbitMQ, and Spring Cloud OpenFeign for HTTP clients.

### Order Execution Flow
The flow for placing an order will depend on both synchronous communications (HTTP calls via REST) and asynchronous messaging with **RabbitMQ.**

The flow is described below:

* 01 - The flow begins by making a request to the order creation endpoint.
* 02 - The input payload (JSON) will be a list of products indicating the ID and desired quantity.
* 03 - Before creating the order, a REST call will be made to the Products API to validate if there is sufficient stock for the purchase of all products.
* 04 - If any product is out of stock, the Products API will return an error, and the Sales API will throw an error message indicating insufficient stock.
* 05 - If there is sufficient stock, an order will be created and saved in MongoDB with a pending status (PENDING).
* 06 - Upon saving the order, a message will be published on RabbitMQ, indicating the ID of the created order, along with the products and their respective IDs and quantities.
* 07 - The Products API will be listening to the queue and will receive the message.
* 08 - Upon receiving the message, the API will revalidate the stock of the products, and if everything is okay, it will update the stock of each product.
* 09 - If the stock is successfully updated, the Products API will publish a message on the sales confirmation queue with a status of APPROVED.
* 10 - If there is an issue with the update, the Products API will publish a message on the sales confirmation queue with a status of REJECTED.
* 11 - Finally, the Orders API will receive the confirmation message and update the order with the status returned in the message.









