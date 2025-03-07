# Stage 1: Build the Vite app
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Pass the backend API URL at build time
ARG VITE_BASE_URL
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Build the app with the correct API URL
RUN VITE_BASE_URL=${VITE_BASE_URL} npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
