import { hash } from "bcryptjs";

import UserModel from "../model/UserModel";

export async function initialData() {
  try {
    await UserModel.sync({ force: true });
    const existsUsers = await UserModel.findAll();

    if (existsUsers.length <= 0) {
      let password = await hash("123456pipboy", 8);
      await UserModel.create({
        name: "Harold Striker",
        email: "haroldstriker@outlook.com",
        password: password,
      });
      console.log("Initial data inserted successfully!");
    }

  } catch (error: any) {
    console.error("Error inserting initial data:");
    console.error(error);
  }
}