# Stage 1: Build
FROM node:22-slim AS build
ENV TZ=Europe/Zurich
ENV BUILD_ENV=production
ENV NODE_ENV=$BUILD_ENV

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

RUN find . -type d -regextype posix-egrep -regex "(.git|.tmp)$" -delete
RUN find . -type f -regextype posix-egrep -regex ".*\.(tsx|ts|tar.gz|md|txt)$" -delete
RUN find . -type f -regextype posix-egrep -regex ".*(README|CHANGELOG).*$" -delete
RUN yarn workspaces focus --production
RUN yarn cache clean --all

FROM node:22-alpine AS production
ENV TZ=Europe/Zurich
ENV BUILD_ENV=production
ENV NODE_ENV=$BUILD_ENV

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000

CMD ["yarn", "run", "start"]
