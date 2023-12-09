import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "@infra/database/provider/DatabaseSequelizeConfig";
import User from "@domain/entities/User";

interface UserCreationAttributes extends Optional<User, "id"> {}

class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User", 
    tableName: "users"
  }
);

export default UserModel;