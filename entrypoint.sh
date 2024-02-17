until  echo "SELECT 1;" | bunx prisma db execute --stdin > /dev/null 2>&1
do
  echo "Waitng for DB"
  sleep 1
done

bunx prisma migrate dev --name init
bunx prisma generate

RUST_BACKTRACE=full bun run --watch app.ts

