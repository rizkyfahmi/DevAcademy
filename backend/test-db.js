const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.$connect()
  .then(() => {
    console.log('SUCCESS_CONNECTED');
    process.exit(0);
  })
  .catch((e) => {
    console.log('FAIL_CONNECTED:', e.message);
    process.exit(0);
  });
