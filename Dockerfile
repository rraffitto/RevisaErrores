# Builder stage: install dev deps and build the project
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files first to leverage caching
COPY package.json package-lock.json* ./

# Install all dependencies (including dev) to run the build
RUN npm ci

# Copy project files and run the build
COPY . .
RUN npm run build


# Runner stage: smaller image with only production deps + built artifacts
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist
# Copy wait script from builder stage so runtime can wait for DB readiness
COPY --from=builder /usr/src/app/server/wait-for-db.cjs ./server/wait-for-db.cjs

EXPOSE 5000

# Run the production bundle
CMD ["sh", "-c", "node ./server/wait-for-db.cjs && NODE_ENV=production node dist/index.js"]
