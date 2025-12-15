FROM node:18-alpine

# Install Chromium for Puppeteer
RUN apk add --no-cache chromium

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "start"]