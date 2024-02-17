import { createCanvas } from "@napi-rs/canvas";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

await client.user.deleteMany();

const user = await client.user.create({
  data: {
    name: "Alice",
    email: "alice@mail.com",
    password: "idk12345"
  }
});

// 1. Create 100 transactions
const txs: Array<Promise<unknown>> = [];
for (let i = 0; i < 100; i++) {
  const tx = client.$transaction(async (tx) => {
    await Bun.sleep(100);
  }, { timeout: 15000, maxWait: 15000 });
  txs.push(tx);
}

// 2. Perform a query
await client.user.findUnique({
  where: { id: user.id }
});

// 3. Do something with napi 
createCanvas(1000, 1000);

console.log("After canvas stuff, waiting for txs to resolve");
await Promise.all(txs)
console.log("No error");
