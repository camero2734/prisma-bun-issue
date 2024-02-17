import { createCanvas } from "@napi-rs/canvas";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function causeError() {
  // 1. Some DB query
  const tx = client.$executeRaw`SELECT pg_sleep(0.01)`;
  // 2. Some napi-based operation
  createCanvas(1000, 1000);
  // 3. Wait for the DB query to finish
  await tx;
}

let success = true;
for (let i = 0; i < 50; i++) {
  try {
    await causeError();
  } catch (e) {
    console.error(e);
    console.log(`Encountered error after ${i + 1} iterations`);
    success = false;
    break;
  }
}

if (success) console.log("No error");
