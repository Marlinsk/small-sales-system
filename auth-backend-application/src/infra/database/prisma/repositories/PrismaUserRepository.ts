import { prisma } from "@shared/providers/PrismaClient";

import User from "@domain/entities/User";
import UserRepository from "@application/repositories/UserRepository";

export default class PrismaUserRepository implements UserRepository {
  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) { return null; }
    return new User(user.id, user.name, user.email, user.password, user.createdAt, user.updatedAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) { return null; }
    return new User(user.id, user.name, user.email, user.password, user.createdAt, user.updatedAt);
  }
}