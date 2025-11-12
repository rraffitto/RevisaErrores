# Builder stage: install dev deps and build the project
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files first to leverage caching
COPY package.json package-lock.json* ./

# Install all dependencies (including dev) to run the build
# Use --legacy-peer-deps to avoid ERESOLVE failures inside the container
# where peer dependency resolution may be stricter than in the developer
# environment. This accepts the existing lockfile behavior.
RUN npm install --legacy-peer-deps

# Copy project files and run the build
COPY . .
RUN npm run build


# Runner stage: smaller image with only production deps + built artifacts
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package.json package-lock.json* ./
# Use --legacy-peer-deps here as well to avoid peer resolution failures
# during container builds. We only install production deps in this stage.
RUN npm install --production --legacy-peer-deps

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist
# Copy wait script from builder stage so runtime can wait for DB readiness
COPY --from=builder /usr/src/app/server/wait-for-db.cjs ./server/wait-for-db.cjs

EXPOSE 5000

# Run the production bundle
CMD ["sh", "-c", "node ./server/wait-for-db.cjs && NODE_ENV=production node dist/index.js"]
