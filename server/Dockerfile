# Build stage
FROM node:16 AS build
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npm run build

# Production stage
FROM node:16
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server/package*.json ./
RUN npm install --production
CMD ["npm", "start"]