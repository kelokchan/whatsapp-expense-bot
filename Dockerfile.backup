# Use Node.js LTS version
FROM node:20-slim

# Install necessary dependencies for Puppeteer/Chrome
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    ca-certificates \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm install typescript ts-node @types/node

# Copy source code
COPY src/ ./src/

# Build TypeScript
RUN npm run build

# Expose port (not really needed for WhatsApp bot, but good practice)
EXPOSE 3000

# Run the bot
CMD ["node", "dist/bot.js"]
