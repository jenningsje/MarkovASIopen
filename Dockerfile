# STEP 1: Build the frontend
FROM node:21-slim as fe-build

ENV NODE_ENV=production
ENV VITE_API_URL=localhost:3000

WORKDIR /frontend

COPY ./backend/graph/schema.graphqls ../backend/graph/

COPY frontend/ .

# --production=false is required because we want to install the @graphql-codegen/cli package (and it's in the devDependencies)
# https://classic.yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-production-true-false
RUN yarn install --frozen-lockfile --production=false
RUN ls -la /frontend
RUN yarn build

# STEP 2: Build the backend
FROM golang:1.22-alpine as be-build
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev

WORKDIR /backend

COPY backend/ .

RUN go mod download

RUN go build -ldflags='-extldflags "-static"' -o /app

RUN rm -rf /usr/local/go/bin/go

RUN wget https://dl.google.com/go/go1.25.9.linux-arm64.tar.gz && \
    tar -C /usr/local -xzf go1.25.9.linux-arm64.tar.gz && \
    rm -rf go1.25.7.linux-arm64.tar.gz