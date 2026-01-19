import { Template } from 'e2b'

export const template = Template()
  // Use Node 22 (bookworm = Debian 12, has good Chrome support)
  .fromImage('node:22-bookworm')
  // Install Chrome/Chromium with all dependencies (need sudo for apt)
  .runCmd(`sudo apt-get update && sudo apt-get install -y --no-install-recommends \
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
    && sudo rm -rf /var/lib/apt/lists/*`)
  // Set Chrome environment variables
  .setEnvs({
    CHROME_PATH: '/usr/bin/chromium',
    PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium',
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true',
  })
  // Pre-install audit tools globally (need sudo for global npm)
  .runCmd('sudo npm install -g lighthouse@latest @axe-core/cli@latest pa11y@latest')
  // Create working directory
  .runCmd('mkdir -p /home/user/project')