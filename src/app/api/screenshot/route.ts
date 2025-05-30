import { NextRequest, NextResponse } from 'next/server';
import { getBrowser } from '../../../lib/puppeteer';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const selector = request.nextUrl.searchParams.get('selector');
  
  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }
  
  if (!selector) {
    return NextResponse.json(
      { error: 'Selector parameter is required' },
      { status: 400 }
    );
  }
  
  let browser;
  
  try {
    // Launch a headless browser using our helper function
    browser = await getBrowser();
    
    const page = await browser.newPage();
    
    // Set a higher viewport size for better resolution
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Higher resolution
    });

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait for the selector to be visible
    await page.waitForSelector(selector, { timeout: 10000 });
    
    // Try to handle cookie popups, but don't worry if it fails
    try {
      // Common cookie consent buttons
      const cookieSelectors = [
        '.cc-dismiss', '.cc-close', '#accept-cookies', '#cookie-accept',
        '.cookie button', '.cookie-banner button', '.cookie-notice button'
      ];
      
      // Try each selector
      for (const selector of cookieSelectors) {
        try {
          const exists = await page.$(selector) !== null;
          if (exists) {
            await page.click(selector);
            console.log(`Clicked cookie button with selector: ${selector}`);
            // Wait for animations to complete
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
          }
        } catch (e) {
          // Ignore errors for individual selectors
        }
      }
    } catch (error) {
      console.warn('Error handling cookie popup:', error);
      // Continue even if we couldn't close the popup
    }
    
    // Get the element
    const element = await page.$(selector);
    
    if (!element) {
      return NextResponse.json(
        { error: `Element with selector "${selector}" not found` },
        { status: 404 }
      );
    }
    
    // Get the bounding box of the element
    const boundingBox = await element.boundingBox();
    
    if (!boundingBox) {
      return NextResponse.json(
        { error: 'Could not get element dimensions' },
        { status: 500 }
      );
    }
    
    // Add padding to ensure we capture the full element (especially the bottom)
    const padding = 20; // Add 20px padding all around
    
    // Take screenshot with padding to ensure we get the full graph
    const screenshot = await page.screenshot({
      type: 'png',
      clip: {
        x: boundingBox.x - padding,
        y: boundingBox.y - padding,
        width: boundingBox.width + (padding * 2),
        height: boundingBox.height + (padding * 2),
      }
    });
    
    // Return the screenshot as an image
    return new NextResponse(screenshot as Buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    
    // More detailed error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    return NextResponse.json(
      { 
        error: `Failed to capture screenshot: ${errorMessage}`,
        stack: errorStack,
        details: 'This error may occur if Chrome is not available in the serverless environment'
      },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
