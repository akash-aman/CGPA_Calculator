FROM node:18-alpine

WORKDIR /app

# Copy lock files if file exists
COPY package.json yarn.lock* package-lock.json* ./

# Omit --production flag for TypeScript devDependencies
RUN yarn install

COPY pages ./pages
COPY component ./component
COPY icons ./icons
COPY redux ./redux
COPY state ./state
COPY styles ./styles
COPY public ./public
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

CMD yarn start
