import { container } from "tsyringe";

import MongodbRepository from "../database/repositories/MongodbRepository";
import OrderRepository from "../interfaces/OrderRepository";

container.registerSingleton<OrderRepository>("OrderRepository", MongodbRepository);