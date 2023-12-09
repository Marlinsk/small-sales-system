import User from "@domain/entities/User";

export class DatabaseOutputMapper {
  public static toDomain(user: {
    id: number;
    name: string;
    email: string;
    password: string
  }): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password
    );
  }
}