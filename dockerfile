# Use the official Chrome + Node image
FROM zenika/alpine-chrome:latest-with-node

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app
COPY . .

# Build Next.js
RUN npm run build

# Start the app
CMD ["npm", "start"]