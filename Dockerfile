# STEP 1: Build the frontend
FROM node:22-slim

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

CMD ["/bin/sh"]