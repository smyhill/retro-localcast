import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const locations = [
  { name: "Germantown, MD", latitude: 39.1732, longitude: -77.2717 },
  { name: "Bethesda, MD", latitude: 38.9847, longitude: -77.0947 },
  { name: "Washington, DC", latitude: 38.9072, longitude: -77.0369 },
  { name: "Syracuse, NY", latitude: 43.0481, longitude: -76.1474 },
];

async function main() {
  for (const location of locations) {
    await prisma.location.upsert({
      where: {
        name: location.name,
      },
      update: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      create: location,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
