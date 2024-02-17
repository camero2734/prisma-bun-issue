import { createCanvas } from "@napi-rs/canvas";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function causeError() {
  const tx = client.$transaction(async (tx) => {
    await Bun.sleep(100);
  });
  createCanvas(1000, 1000);
  await tx;
}

let success = true;
for (let i = 0; i < 50; i++) {
  try {
    await causeError();
  } catch (e) {
    console.log(`Encountered error after ${i + 1} iterations`);
    success = false;
    break;
  }
}

if (success) console.log("No error");
