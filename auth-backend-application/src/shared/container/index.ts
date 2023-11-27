import { container } from "tsyringe";

import UserRepository from "@application/repositories/UserRepository";
import PrismaUserRepository from "@infra/database/prisma/repositories/PrismaUserRepository";
import Validations from "@shared/validations";

container.registerSingleton<UserRepository>("UserRepository", PrismaUserRepository);
container.registerInstance("Validations", Validations);