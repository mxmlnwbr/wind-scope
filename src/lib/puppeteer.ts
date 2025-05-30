import chromium from 'chrome-aws-lambda';
import puppeteerCore from 'puppeteer-core';

// This helper function ensures we use the correct Chrome binary in different environments
export async function getBrowser() {
  // Determine if we're in a production environment
  const isDev = process.env.NODE_ENV === 'development';
  
  const options = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  };

  try {
    // Launch browser with chrome-aws-lambda
    console.log(`Launching browser with executablePath: ${options.executablePath}`);
    return await puppeteerCore.launch(options);
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
}
