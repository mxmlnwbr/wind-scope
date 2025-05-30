import { chromium } from 'playwright';
import type { Browser } from 'playwright';

// This helper function ensures we use the correct Chrome binary in different environments
export async function getBrowser(): Promise<Browser> {
  try {
    // Check if we're in a Vercel environment
    const isVercel = process.env.VERCEL === '1';
    
    console.log(`Launching browser with Playwright (${isVercel ? 'Vercel' : 'local'} environment)`);
    
    // Launch with appropriate options for the environment
    return await chromium.launch({
      headless: true,
      // Additional options for serverless environments
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });
  } catch (error) {
    console.error('Error launching browser:', error);
    
    // More detailed error information
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
      
      // Suggest solutions based on common errors
      if (error.message.includes("Executable doesn't exist")) {
        console.error('Suggestion: Run "pnpm exec playwright install chromium" to install the browser');
      }
    }
    
    throw error;
  }
}
