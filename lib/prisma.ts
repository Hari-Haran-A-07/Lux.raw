import { PrismaClient } from "@prisma/client";
import path from "path";

function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") {
    return process.env.DATABASE_URL;
  }
  const dbPath = path.join(process.cwd(), "prisma", "dev.db").replace(/\\/g, "/");
  return `file:${dbPath}`;
}

const resolvedDbUrl = getDatabaseUrl();

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

