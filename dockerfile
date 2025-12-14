FROM node:18-bullseye
WORKDIR /app

# Install Chrome
RUN apt-get update && apt-get install -y wget gnupg \
    && wget -qO- https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /usr/share/keyrings/google-chrome.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Verify installation
RUN echo "Chrome installed:" && google-chrome-stable --version

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]