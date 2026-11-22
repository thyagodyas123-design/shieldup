import { defineConfig, devices } from '@playwright/test';
const pagesBasePath = process.env.PAGES_BASE_PATH;
const localServer = 'http://127.0.0.1:3100';
const channel = process.env.CI ? 'chromium' : 'chrome';

export default defineConfig({
  testDir: './tests/e2e', fullyParallel: true, workers: 2, retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: process.env.BASE_URL || localServer, trace: 'retain-on-failure' },
  webServer: process.env.BASE_URL ? undefined : {
    command: pagesBasePath === undefined
      ? 'npm run build && npm run start -- --hostname 127.0.0.1 --port 3100'
      : 'npm run build && python3 scripts/preview-pages.py',
    url: `${localServer}${pagesBasePath ?? ''}/`,
    timeout: 120000,
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'], channel } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'], defaultBrowserType: 'chromium', channel } },
  ],
});
