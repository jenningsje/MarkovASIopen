# STEP 1: Build the frontend
FROM node:22-slim as fe-build

ENV NODE_ENV=production
ENV VITE_API_URL=localhost:8887

WORKDIR /frontend

COPY ./backend/graph/schema.graphqls ../backend/graph/

COPY frontend/ .

# --production=false is required because we want to install the @graphql-codegen/cli package (and it's in the devDependencies)
# https://classic.yarnpkg.com/lang/en/docs/cli/install/#toc-yarn-install-production-true-false
RUN rm -rf node_modules yarn.lock
RUN yarn install --frozen-lockfile --production=false
RUN ls -la /frontend
RUN yarn build

# STEP 2: Build the backend
FROM golang:1.25-alpine
ENV CGO_ENABLED=1
RUN apk add --no-cache gcc musl-dev git bash build-base curl-dev


WORKDIR /backend

COPY backend/ .
COPY train/ .

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf "https://github.com/"

# get go packages
RUN go get github.com/mattn/go-sqlite3
RUN go get github.com/pressly/goose/v3
RUN go get github.com/semanser/ai-coder@upgrade

RUN go mod download

# RUN go build -ldflags='-extldflags "-static"' -o /app

CMD ["/bin/sh"]
