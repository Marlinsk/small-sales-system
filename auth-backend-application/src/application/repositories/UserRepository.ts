import User from "../../domain/entities/User";

export default abstract class UserRepository {
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}