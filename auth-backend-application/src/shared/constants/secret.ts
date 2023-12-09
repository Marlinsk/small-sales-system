export const PORT = process.env.PORT || 8080;
export const CONTAINER_ENV = "container";
export const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "MjgxMDExZTYtNWQ4OS00NWI5LTg0OGMtYjVhZTI0OWIzYmM2";
export const DB_HOST = process.env.DB_HOST ? process.env.DB_HOST : "localhost";
export const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : "auth-db";
export const DB_USER = process.env.DB_USER ? process.env.DB_USER : "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "m070498m";
export const DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : "5842";