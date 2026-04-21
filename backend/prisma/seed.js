const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Users
  const manager = await prisma.user.upsert({
    where: { email: 'manager@slooze.com' },
    update: {},
    create: {
      email: 'manager@slooze.com',
      password,
      name: 'John Manager',
      role: 'MANAGER',
    },
  });

  const keeper = await prisma.user.upsert({
    where: { email: 'keeper@slooze.com' },
    update: {},
    create: {
      email: 'keeper@slooze.com',
      password,
      name: 'Jane Keeper',
      role: 'STORE_KEEPER',
    },
  });

  console.log('Users created:', { manager: manager.email, keeper: keeper.email });

  // Products
  const products = [
    { name: 'Crude Oil', category: 'Energy', quantity: 5000, unitPrice: 75.5, status: 'In Stock' },
    { name: 'Natural Gas', category: 'Energy', quantity: 200, unitPrice: 3.2, status: 'Low Stock' },
    { name: 'Gold Bullion', category: 'Metals', quantity: 50, unitPrice: 2100.0, status: 'In Stock' },
    { name: 'Steel Sheets', category: 'Materials', quantity: 1500, unitPrice: 650.0, status: 'In Stock' },
    { name: 'Iron Ore', category: 'Materials', quantity: 8000, unitPrice: 120.0, status: 'In Stock' },
    { name: 'Wheat', category: 'Agricultural', quantity: 12000, unitPrice: 0.25, status: 'In Stock' },
    { name: 'Copper Wire', category: 'Metals', quantity: 2000, unitPrice: 8.5, status: 'In Stock' },
    { name: 'Silver Bars', category: 'Metals', quantity: 300, unitPrice: 28.0, status: 'In Stock' },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
