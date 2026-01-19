# E2B Custom Sandbox Template for Auditing
# Build with: e2b template build
# Provides: Node 22+, Chrome, pre-installed audit tools

FROM node:22-bookworm

# Avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install Chrome/Chromium and all dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    fonts-noto-color-emoji \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set Chrome environment variables
ENV CHROME_PATH=/usr/bin/chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Pre-install audit tools globally for faster runtime
# Using latest versions since we have Node 22+
RUN npm install -g lighthouse@latest @axe-core/cli@latest pa11y@latest

# Create working directory with proper permissions
RUN mkdir -p /home/user/project && chown -R node:node /home/user
WORKDIR /home/user/project

# Switch to non-root user (e2b convention)
USER node
