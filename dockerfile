FROM node:18-alpine

# Install dependencies for Puppeteer and build tools
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash \
    git \
    python3 \
    make \
    g++

# Set Puppeteer env variables to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build Next.js application
RUN npm run build

# Generate Prisma client if you have prisma schema
RUN if [ -f "prisma/schema.prisma" ]; then npx prisma generate; fi

EXPOSE 3000

# Start the application
CMD ["npm", "start"]