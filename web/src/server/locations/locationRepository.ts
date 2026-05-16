import { prisma } from "@/server/db/prisma";

export async function listLocations() {
  return prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
