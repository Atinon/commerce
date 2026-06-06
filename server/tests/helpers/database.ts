import { prisma } from "../../src/config/index.js";

export async function clearUsers() {
  return prisma.user.deleteMany();
}
export async function clearProducts() {
  return prisma.product.deleteMany();
}
export async function clearOrderItems() {
  return prisma.orderItem.deleteMany();
}
export async function clearOrders() {
  return prisma.order.deleteMany();
}

export async function clearDatabase() {
  await clearUsers();
  await clearProducts();
  await clearOrderItems();
  await clearOrders();
}

export async function disconnectDatabase() {
  return prisma.$disconnect();
}
