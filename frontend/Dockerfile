# frontend/Dockerfile

# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve it using a simple static file server
FROM node:18

WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
