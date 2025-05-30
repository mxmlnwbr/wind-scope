import puppeteer from 'puppeteer';

// This helper function ensures we use the correct Chrome binary in different environments
export async function getBrowser() {
  // For Vercel serverless environment
  const options = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ],
    headless: true
  };

  return puppeteer.launch(options);
}
