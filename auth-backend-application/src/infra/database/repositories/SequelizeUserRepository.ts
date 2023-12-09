import { DatabaseOutputMapper } from "../mappers/DatabaseOutputMapper";

import User from "@domain/entities/User";
import UserModel from "../model/UserModel";
import UserRepository from "@application/repositories/UserRepository";

export default class SequelizeUserRepository implements UserRepository {
  async findById(id: number): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ where: { id } });
      if (!user) { return null; }
      return DatabaseOutputMapper.toDomain(user);
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) { return null; }
      return DatabaseOutputMapper.toDomain(user);
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
}