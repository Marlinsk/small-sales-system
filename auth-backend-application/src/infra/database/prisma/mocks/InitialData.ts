import { hash } from "bcryptjs";

import { prisma } from "@shared/providers/PrismaClient";

export async function initialData() {
  try {
    const users = await prisma.user.findMany();
    if (users.length <= 0) {
      const password = await hash('12345pipboy', 8);
      const users = await prisma.user.createMany({
        data: [
          { id: 1, name: 'Harold Striker', email: 'haroldstriker@outlook.com', password: password },
          { id: 2, name: 'Gabe Newell', email: 'newgabe@outlook.com', password: password }
        ]
      });
      console.log('Data added successfully');
      console.log(users);
    }
  } catch (error) {
    console.log('Data addition process failed: ', error);
  } finally {
    await prisma.$disconnect();
  }
}