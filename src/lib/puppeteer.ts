import puppeteer from 'puppeteer';

// This helper function ensures we use the correct Chrome binary in different environments
export async function getBrowser() {
  const options = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ],
    headless: true
  };

  try {
    // Use the installed Chrome browser
    return await puppeteer.launch(options);
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
}
