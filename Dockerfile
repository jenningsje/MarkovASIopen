# ----------------------
# STEP 1: Frontend build
# ----------------------
FROM node:21-slim as fe-build

ENV NODE_ENV=production
ENV VITE_API_URL=localhost:3000

# Copy train folder if frontend needs it
COPY train/ /train/

WORKDIR /frontend

COPY ./backend/graph/schema.graphqls ../backend/graph/
COPY frontend/ .

# Install dependencies (including devDependencies)
RUN yarn install --frozen-lockfile --production=false
RUN yarn build

# ----------------------
# STEP 2: Backend build
# ----------------------
FROM golang:1.22-alpine as be-build

ENV CGO_ENABLED=1

# Install compiler, musl dev, and curl headers
RUN apk add --no-cache g++ make musl-dev curl-dev

WORKDIR /train

# Copy C++ source
COPY train/fetch_apis.cpp .

# Compile fetch_apis (dynamically linked to libcurl)
RUN g++ -std=c++17 fetch_apis.cpp -lcurl -pthread -o fetch_apis

# Copy Go backend
WORKDIR /backend
COPY backend/ .

RUN go mod download
RUN go build -ldflags='-extldflags "-static"' -o /app

# ----------------------
# STEP 3: Final image
# ----------------------
FROM alpine:3.18

# Copy backend and fetch_apis
COPY --from=be-build /train /train
COPY --from=be-build /app /app

# Copy frontend build
COPY --from=fe-build /frontend/dist /fe

# Set default command
CMD /app
