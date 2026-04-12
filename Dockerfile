# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the Express server
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Install tsx globally or as a dependency to run the server
RUN npm install -g tsx

# Copy built assets and server code
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.ts ./
COPY --from=build /app/package.json ./

# Create data directory for local storage
RUN mkdir -p data

EXPOSE 3000

# Start the server
CMD ["npm", "start"]
