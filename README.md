# prisma-bun-issue
This reproduces an issue w/ Prisma <> Bun in versions since 1.0.18.

Run with `docker-compose up`. This will result in errors. Change the Dockerfile's base image to `oven/sh:1.0.18-slim`, and it will pass with no issues.
