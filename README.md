# <img src="assets/add-to-cart.png" width="36px" height="36px"> Microservices-based Small Sales System Application
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
- MongoDB
- PostgreSQL
- RabbitMQ 
- API REST
- Docker
- docker-compose
- JWT
- Axios

## Architecture
The project was developed following the architecture below:

<p align="center">
  <img alt="architecture" src="assets/Architecture.drawio.png"/>
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

## Cloning and running the project with docker 
**Note:** To run this project, it is necessary to have Docker installed on your machine.

**1º step: clone the repository to your machine from GitHub.**
```bash
git clone https://github.com/Marlinsk/small-sales-system.git
```

**2º step: Navigate to the project folder.**
```bash
cd small-sales-system
```

**3º step: Run this docker-compose command to build the images and start the containers.**
```bash
docker-compose build
```

**Run this command to execute the tasks in the background.**
```bash
docker-compose build -d
```

After everything is up and running, just open any request tool and play around.

## Endpoints description
The Auth-API application features a single endpoint dedicated to authentication.

The Product-API application is composed of three modules, each hosting multiple endpoints catering to products, categories, and suppliers.

Conversely, the Sales-API application is streamlined with just four endpoints.

**Notes:** 
 - In some projects, data is generated during the initialization execution.
 - All endpoints in the Product-API and Sales-API services require the authorization and transactionid headers.

### Auth-API
Base URL: http://localhost:8080

**POST** Performs user login:

Validates user credentials and generates the user authentication token on the platform.

> /api/user/auth

Body:

```json
{
    "email": "haroldstriker@outlook.com",
    "password": "123456pipboy"
}
```

Response example:

```json
{
    "status": 200,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlciI6eyJpZCI6MSwibmFtZSI6Ikhhcm9sZCBTdHJpa2VyIiwiZW1haWwiOiJoYXJvbGRzdHJpa2VyQG91dGxvb2suY29tIn0sImlhdCI6MTcwMjI1MjQxNywiZXhwIjoxNzAyMzM4ODE3LCJzdWIiOiIxIn0.rjwc7BEwXcIQqe7vQ-QUqiOT7kAp7CbLIjKwLE_-O_o"
}
```

**GET** Displays the email of the authenticated user:

Provide the email of the authenticated user in the parameters, and then make the request.

> /api/user/email/:email

### Product-API
Base URL: http://localhost:8081

#### Product Module

**POST** Create a new product

To create a product, it is necessary to provide the category ID, supplier ID, product name, and quantity.

> /api/product

Body:

```json
{
    "name": "Processor Intel Core i9-13900K, 13th Generation, 5.8GHz Max Turbo, 36MB Cache, 24 Cores, LGA 1700, Integrated Graphics - BX8071513900K",
    "quantity_available": 3,
    "supplierId": 1001,
    "categoryId": 1001
}
```

Response (params.id = 1004):

```json
{
    "id": 1004,
    "name": "Processor Intel Core i9-13900K, 13th Generation, 5.8GHz Max Turbo, 36MB Cache, 24 Cores, LGA 1700, Integrated Graphics - BX8071513900K",
    "supplier": {
        "id": 1001,
        "name": "Intel"
    },
    "category": {
        "id": 1001,
        "description": "Hardware"
    },
    "quantity_available": 3,
    "created_at": "09/12/2023 16:05:43"
    "updated_at": "09/12/2023 16:05:43"
}
```

**PUT** Update a product

Include the product ID in the URL parameters of the request, and change the body.

> /api/product/{id}

Body:

```json
{
    "name": "Processor Intel Core i9-13900K, 13th Generation, 5.8GHz Max Turbo, 36MB Cache, 24 Cores, LGA 1700, Integrated Graphics - BX8071513900K",
    "quantity_available": 3,
    "supplierId": 1001,
    "categoryId": 1001
}
```

Response:

```json
{
    "id": 1,
    "name": "Processor Intel Core i9-13900K, 13th Generation, 5.8GHz Max Turbo, 36MB Cache, 24 Cores, LGA 1700, Integrated Graphics - BX8071513900K",
    "supplier": {
        "id": 1001,
        "name": "Intel"
    },
    "category": {
        "id": 1001,
        "description": "Hardware"
    },
    "quantity_available": 7,
    "created_at": "09/12/2023 16:05:43"
    "updated_at": "09/12/2023 16:08:48"
}
```

**DELETE** Remove a product by id

Include the product ID in the URL parameters of the request.

> /api/product/{id}

Response (params.id = 1002):

```json
{
    "status": 200,
    "message": "The product was deleted."
}
```

**GET** Get all products

Retrieve all products that are stored in the database.

> /api/product

Response:

```json
[
    {
        "id": 1001,
        "name": "Processador Intel Core i7-10700KF, 10ª Geração, 3.8GHz (5.1GHz Max Turbo), Cache 16MB, LGA 1200 - BX8070110700KF",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 5,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    },
    {
        "id": 1002,
        "name": "Processador Intel Core i9-11900K, 11ª Geração, 3.5 GHz (5.1GHz Turbo), Cache 16MB, Octa Core, LGA1200, Vídeo Integrado - BX8070811900K",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 3,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    },
    {
        "id": 1003,
        "name": "Processador Intel Core i9-12900F, 12ª Geração, Cache 30MB, 2.4GHz (5.1GHz Max Turbo), LGA 1700 - BX8071512900F",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 4,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    }
]
```

**GET** Get product by ID

Include the product ID in the URL parameters of the request.

> /api/product/{id}

Response (params.id = 1001):

```json
{
    "id": 1001,
    "name": "Processador Intel Core i7-10700KF, 10ª Geração, 3.8GHz (5.1GHz Max Turbo), Cache 16MB, LGA 1200 - BX8070110700KF",
    "category": {
        "id": 1001,
        "description": "Hardware"
    },
    "supplier": {
        "id": 1001,
        "name": "Intel"
    },
    "quantity_available": 5,
    "created_at": "10/12/2023 19:24:23",
    "updated_at": "10/12/2023 19:24:23"
}
```

**GET** Get products by name (without case sensitive)

Include the product name in the URL parameters of the request.

> /api/product/name/{name}

Response (params.name = "Pro"):

```json
[
    {
        "id": 1001,
        "name": "Processador Intel Core i7-10700KF, 10ª Geração, 3.8GHz (5.1GHz Max Turbo), Cache 16MB, LGA 1200 - BX8070110700KF",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 5,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    },
    {
        "id": 1002,
        "name": "Processador Intel Core i9-11900K, 11ª Geração, 3.5 GHz (5.1GHz Turbo), Cache 16MB, Octa Core, LGA1200, Vídeo Integrado - BX8070811900K",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 3,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    }
]
```

**GET** Get products by category ID:

Include the category ID in the URL parameters of the request.

> /api/product/category/{categoryId}

Response (params.categoryId = 1001):

```json
[
    {
        "id": 1001,
        "name": "Processador Intel Core i7-10700KF, 10ª Geração, 3.8GHz (5.1GHz Max Turbo), Cache 16MB, LGA 1200 - BX8070110700KF",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 5,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    },
    {
        "id": 1002,
        "name": "Processador Intel Core i9-11900K, 11ª Geração, 3.5 GHz (5.1GHz Turbo), Cache 16MB, Octa Core, LGA1200, Vídeo Integrado - BX8070811900K",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 3,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    },
    {
        "id": 1003,
        "name": "Processador Intel Core i9-12900F, 12ª Geração, Cache 30MB, 2.4GHz (5.1GHz Max Turbo), LGA 1700 - BX8071512900F",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1001,
            "name": "Intel"
        },
        "quantity_available": 4,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    }
]
```

**GET** Get products by supplier ID:

Include the supplier ID in the URL parameters of the request.

>  /api/product/supplier/{supplierId}

Response (params.supplierId = 1006):

```json
[
    {
        "id": 1008,
        "name": "Placa de Vídeo RTX 4060 1-Click OC 1X Galax NVIDIA GeForce, 8GB GDDR6, DLSS, Ray Trancing, G-Sync",
        "category": {
            "id": 1001,
            "description": "Hardware"
        },
        "supplier": {
            "id": 1006,
            "name": "Galax"
        },
        "quantity_available": 6,
        "created_at": "10/12/2023 19:24:23",
        "updated_at": "10/12/2023 19:24:23"
    }
]
```

**POST** Check product quantity availabel:

Check if the provided quantity is compatible with the availability.

> /api/product/check-stock

Body:

```json
{
    "products": [
        {
            "productId": 1001,
            "quantity": 1
        },
        {
            "productId": 1002,
            "quantity": 1
        },
        {
            "productId": 1003,
            "quantity": 1
        }
    ]
}
```

Response:

```json
{
    "status": 200,
    "message": "The stock is ok!"
}
```

**GET** List product sales ID

Retrieve the product along with all the IDs of the orders placed for it.

> /api/product/{productId}/sales

Response:

```json
{
    "id": 1001,
    "name": "Graphics Card Gigabyte NVIDIA GeForce GTX 1650 D6 OC 4G, 4GB GDDR6, REV 4.0 - GV-N1656OC-4GD 4.0",
    "supplier": {
        "id": 1005,
        "name": "GigaByte"
    },
    "category": {
        "id": 1000,
        "description": "Hardware"
    },
    "sales": [
        "6161cd32560fbede60d48efc",
        "6161cd32560fbede60d48efe",
        "6161d007560fbede60d48f01"
    ],
    "quantity_available": 3,
    "created_at": "09/12/2023 14:11:15"
    "updated_at": "09/12/2023 14:11:15"
}
```

#### Supplier Module

**POST** Create a new supplier

> /api/supplier

Body:

```json
{
    "name": "Amazon"
}
```

Response:

```json
{
    "id": 1,
    "name": "Amazon"
}
```

**PUT** Update supplier by ID

Include the supplier ID in the URL parameters of the request.

> /api/supplier/{id}

Body:

```json
{
    "name": "Amazon BR"
}
```

Response:

```json
{
    "id": 1,
    "name": "Amazon BR"
}
```

**DELETE** Delete supplier by ID

Include the supplier ID in the URL parameters of the request.

> /api/supplier/{id}

Response:

```json
{
    "status": 200,
    "message": "The supplier was deleted."
}
```

**GET** Get all supplier

Retrieve all supplier that are stored in the database.

> /api/supplier

Response:

```json
[
    {
        "id": 1001,
        "name": "Intel"
    },
    {
        "id": 1002,
        "name": "AMD"
    },
    {
        "id": 1003,
        "name": "NVIDIA"
    },
    {
        "id": 1004,
        "name": "ASUS"
    },
    {
        "id": 1005,
        "name": "GigaByte"
    }
]
```

**GET** Get supplier by ID

> /api/supplier/{id} 

Response (params.id = 1004): 

```json
{
   "id": 1004,
   "name": "ASUS"
}
```

**GET** Get supplier by name

Include the suppliers name in the URL parameters of the request.

> /api/supplier/name/{name}

Response (params.name = ASUS): 

```json
[
  {
     "id": 1004,
     "name": "ASUS"
  }
]
```

#### Category Module

**POST** Create a new category

> /api/category

Body:

```json
{
   "description": "Games"
}
```

Response:

```json
{
   "id": 1,
   "description": "Games"
}
```

**PUT** Update category by ID

Include the category ID in the URL parameters of the request.

> /api/category/{id}

Body:

```json
{
   "name": "Monitor"
}
```

Response:

```json
{
   "id": 1,
   "name": "Monitor"
}
```

**DELETE** Delete category by ID

Include the category ID in the URL parameters of the request.

> /api/category/{id}

Response:

```json
{
   "status": 200,
   "message": "The category was deleted."
}
```

**GET** Get all categories

Retrieve all categories that are stored in the database.

> /api/category

Response:

```json
[
  {
    "id": 1001,
    "description": "Hardware"
  }
]
```

**GET** Get category by ID

> /api/category/{id} 

Response (params.id = 1001): 

```json
{
  "id": 1001,
  "description": "Hardware"
}
```

**GET** Get category by name

Include the category name in the URL parameters of the request.

> /api/category/name/{name}

Response (params.name = "Hardware"): 

```json
[
  {
     "id": 1001,
     "name": "Hardware"
  }
]
```

### Sales-API
Base URL: http://localhost:8082

**POST** Create a new order

> /api/order/create

Body:

```json
{
  "products": [
    {
      "productId": 1001,
      "quantity": 1
    },
    {
      "productId": 1018,
      "quantity": 1
    },
    {
      "productId": 1021,
      "quantity": 1
    }
  ]
}
```

Response:

```json
{
    "status": 200,
    "order": {
        "_id": "6576650891f50cf8744b0fe2",
        "products": [
            {
                "productId": "1001",
                "quantity": 1,
                "_id": "6576650891f50cf8744b0fe3"
            },
            {
                "productId": "1018",
                "quantity": 1,
                "_id": "6576650891f50cf8744b0fe4"
            },
            {
                "productId": "1021",
                "quantity": 1,
                "_id": "6576650891f50cf8744b0fe5"
            }
        ],
        "user": {
            "id": "1"
        },
        "status": "PENDING",
        "createdAt": "2023-12-11T01:25:28.804Z",
        "updatedAt": "2023-12-11T01:25:28.804Z"
    }
}
```

**GET** Get all orders

Retrieve all orders that are stored in the database.

> /api/order

Response:

```json
{
    "status": 200,
    "orders": [
        {
            "_id": "6576650891f50cf8744b0fe2",
            "products": [
                {
                    "productId": "1001",
                    "quantity": 1,
                    "_id": "6576650891f50cf8744b0fe3"
                },
                {
                    "productId": "1018",
                    "quantity": 1,
                    "_id": "6576650891f50cf8744b0fe4"
                },
                {
                    "productId": "1021",
                    "quantity": 1,
                    "_id": "6576650891f50cf8744b0fe5"
                }
            ],
            "user": {
                "id": "1"
            },
            "status": "APPROVED",
            "createdAt": "2023-12-11T01:25:28.804Z",
            "updatedAt": "2023-12-11T01:25:29.013Z"
        },
        {
            "_id": "6576652991f50cf8744b0fef",
            "products": [
                {
                    "productId": "1001",
                    "quantity": 1,
                    "_id": "6576652991f50cf8744b0ff0"
                },
                {
                    "productId": "1018",
                    "quantity": 1,
                    "_id": "6576652991f50cf8744b0ff1"
                },
                {
                    "productId": "1021",
                    "quantity": 1,
                    "_id": "6576652991f50cf8744b0ff2"
                }
            ],
            "user": {
                "id": "1"
            },
            "status": "APPROVED",
            "createdAt": "2023-12-11T01:26:01.687Z",
            "updatedAt": "2023-12-11T01:26:01.826Z"
        }
    ]
}
```

**GET** Get order by ID

Include the order ID in the URL parameters of the request.

> /api/order/{id}

Response (params.id = "6576652991f50cf8744b0fef"):

```json
{
    "status": 200,
    "order": {
        "_id": "6576652991f50cf8744b0fef",
        "products": [
            {
                "productId": "1001",
                "quantity": 1,
                "_id": "6576652991f50cf8744b0ff0"
            },
            {
                "productId": "1018",
                "quantity": 1,
                "_id": "6576652991f50cf8744b0ff1"
            },
            {
                "productId": "1021",
                "quantity": 1,
                "_id": "6576652991f50cf8744b0ff2"
            }
        ],
        "user": {
            "id": "1"
        },
        "status": "APPROVED",
        "createdAt": "2023-12-11T01:26:01.687Z",
        "updatedAt": "2023-12-11T01:26:01.826Z"
    }
}
```

**GET** Get orders by product ID

Retrieve all orders ID for a product.

> /api/orders/products/{productId}

Response (params.id = 1018):

```json
{
    "status": 200,
    "salesIds": [
        "6576650891f50cf8744b0fe2",
        "6576652991f50cf8744b0fef"
    ]
}
```

## Logs and Tracing
All endpoints require a header named **transactionid** as it will represent the ID that will traverse the entire request within the service. In case this application calls other microservices, this **transactionid** will be forwarded. All input and output endpoints will log the input data (JSON or parameters) and the **transactionid**.

For each request to each microservice, we will have a **serviceid** attribute generated solely for the logs of that specific service. We will then have the **transactionid** circulating among all the microservices involved in the request, and each microservice will have its own **serviceid**.

Request tracing flow:

**POST** - **/api/order** with **transactionid**: ef8347eb-2207-4610-86c0-657b4e5851a3

```
service-1:
transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
serviceid    : 6116a0f4-6c9f-491f-b180-ea31bea2d9de
|
| HTTP Request
|----------------> service-2:
                   transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
                   serviceid    : 4e1261c1-9a0c-4a5d-bfc2-49744fd159c6
                   |
                   | HTTP Request
                   |----------------> service-3: /api/check-stock
                                      transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
                                      serviceid    : b4fbc082-a49a-440d-b1d6-2bd0557fd189
```

As we can see in the flow above, the **transactionid** (ef8347eb-2207-4610-86c0-657b4e5851a3) remained the same across all three services, and each service has its own **serviceid**.

Example of logs in the developed APIs:

**Auth-API:**

```
Request to POST login with data {"email":"testeuser1@gmail.com","password":"123456"} | [transactionID: e3762030-127a-4079-9dee-ba961d7e77ce | serviceID: 6b07b6c2-009e-4799-be96-3bf972338b17]

Response to POST login with data {"status":200,"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoVXNlciI6eyJpZCI6MSwibmFtZSI6IlVzZXIgVGVzdCAxIiwiZW1haWwiOiJ0ZXN0ZXVzZXIxQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MzQwNTE4ODQsImV4cCI6MTYzNDEzODI4NH0.NJ-h2i5XPT8NwZyZ_43bif1NIS00ROfCtRecBkxy5A8"} | [transactionID: e3762030-127a-4079-9dee-ba961d7e77ce | serviceID: 6b07b6c2-009e-4799-be96-3bf972338b17]
```

**Product-API:**

```
Request to POST product stock with data {"products":[{"productId":1001,"quantity":1},{"productId":1002,"quantity":1},{"productId":1003,"quantity":1}]} | [transactionID: 8817508e-805c-48fb-9cb4-6a1e5a6e71e9 | serviceID: ea146e74-55cf-4a53-860e-9010d6e3f61b]

Response to POST product stock with data {"status":200,"message":"The stock is ok!"} | [transactionID: 8817508e-805c-48fb-9cb4-6a1e5a6e71e9 | serviceID: ea146e74-55cf-4a53-860e-9010d6e3f61b]
```

**Sales-API:**

```
Request to POST new order with data {"products":[{"productId":1001,"quantity":1},{"productId":1002,"quantity":1},{"productId":1003,"quantity":1}]} | [transactionID: 8817508e-805c-48fb-9cb4-6a1e5a6e71e9 | serviceID: 5f553f02-e830-4bed-bc04-8f71fe16cf28]

Response to POST login with data {"status":200,"createdOrder":{"products":[{"productId":1001,"quantity":1},{"productId":1002,"quantity":1},{"productId":1003,"quantity":1}],"user":{"id":1,"name":"User Test 1","email":"testeuser1@gmail.com"},"status":"PENDING","createdAt":"2021-10-12T16:34:49.778Z","updatedAt":"2021-10-12T16:34:49.778Z","transactionid":"8817508e-805c-48fb-9cb4-6a1e5a6e71e9","serviceid":"5f553f02-e830-4bed-bc04-8f71fe16cf28","_id":"6165b92addaf7fc9dd85dad0","__v":0}} | [transactionID: 8817508e-805c-48fb-9cb4-6a1e5a6e71e9 | serviceID: 5f553f02-e830-4bed-bc04-8f71fe16cf28]
```

**RabbitMQ:**

```
Sending message to product update stock: {"salesId":"6165b92addaf7fc9dd85dad0","products":[{"productId":1001,"quantity":1},{"productId":1002,"quantity":1},{"productId":1003,"quantity":1}],"transactionid":"8817508e-805c-48fb-9cb4-6a1e5a6e71e9"}

Recieving message with data: {"salesId":"6165b92addaf7fc9dd85dad0","products":[{"productId":1001,"quantity":1},{"productId":1002,"quantity":1},{"productId":1003,"quantity":1}],"transactionid":"8817508e-805c-48fb-9cb4-6a1e5a6e71e9"} and TransactionID: 8817508e-805c-48fb-9cb4-6a1e5a6e71e9

Sending message: {"salesId":"6165b92addaf7fc9dd85dad0","status":"APPROVED","transactionid":"8817508e-805c-48fb-9cb4-6a1e5a6e71e9"}

Recieving message from queue: {"salesId":"6165b92addaf7fc9dd85dad0","status":"APPROVED","transactionid":"8817508e-805c-48fb-9cb4-6a1e5a6e71e9"}
```

