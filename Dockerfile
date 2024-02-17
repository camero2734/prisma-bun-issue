FROM oven/bun:1.0.27-slim

USER root
WORKDIR /code

RUN apt update
RUN apt install -y curl

# Node for Prisma generate
ARG NODE_VERSION=20
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

# NPM packages
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile --ignore-scripts

# Copy all files
COPY . .

ENTRYPOINT ["bash", "./entrypoint.sh"]
