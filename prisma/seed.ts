import { prisma } from "../src/server/db";

async function main() {
  await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
      password: "12345",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
