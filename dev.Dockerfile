FROM node:18-alpine

WORKDIR /app

# Copy lock files if file exists
COPY package.json yarn.lock* package-lock.json* ./

RUN yarn install

VOLUME [ "/app/pages","/app/component","/app/icons","/app/redux","/app/state","/app/styles","/app/public"]
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .

CMD yarn dev
