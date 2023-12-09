import { Sequelize, Options } from "sequelize";

import { 
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT, 
} from "@shared/constants/secret";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  quoteIdentifiers: false,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
  pool: {
    acquire: 180000,
  },
} as Options);

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection has been established!");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database.");
    console.error(err.message);
  });

export default sequelize;
