import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
 await prisma.contact.deleteMany()

 console.log("Seed data deleted successfully")
}

main()
 .catch((e) => {
  console.error(e)
  process.exit(1)
 })
 .finally(async () => {
  await prisma.$disconnect()
 })