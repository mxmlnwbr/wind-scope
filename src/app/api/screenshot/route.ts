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
    
    // Check if cookie popup exists and close it
    try {
      // Look for common cookie popup elements and close buttons
      const cookieSelectors = [
        // Standard buttons
        '.cc-dismiss', // Common cookie consent dismiss button
        '.cc-close',   // Common cookie consent close button
        '#accept-cookies',
        '#cookie-accept',
        // Text-based selectors (using page.$$eval instead of :contains which isn't standard)
        'button',
        '.cookie button',
        '.cookie-banner button',
        '.cookie-notice button',
        '#cookie-consent button',
        '.cookie-consent button',
        '.cookie-popup button',
        '.cookie-dialog button',
        '[role="dialog"] button',
        // Close buttons
        '.close-button',
        '.cookie-close',
        'button.close',
        '[data-dismiss="cookie"]',
        '[aria-label="Close"]',
      ];
      
      // Try each selector
      for (const cookieSelector of cookieSelectors) {
        const hasButtons = await page.$$eval(cookieSelector, (buttons: Element[]) => buttons.length > 0);
        if (hasButtons) {
          // Click the first matching button
          await page.click(cookieSelector);
          console.log(`Clicked cookie button with selector: ${cookieSelector}`);
          // Wait a moment for any animations to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
          break;
        }
      }
      
      // If we still see a dialog with 'Cookie' text, try to click any visible X or close button
      const cookieDialogVisible = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        return elements.some(el => {
          const text = el.textContent?.toLowerCase() ?? '';
          return text.includes('cookie') && window.getComputedStyle(el).display !== 'none';
        });
      });
      
      if (cookieDialogVisible) {
        // Try to find and click on an X symbol or close button
        await page.evaluate(() => {
          // Find buttons with X text
          const closeTexts = ['×', 'X', '✕', '✖', 'Close', 'Schließen'];
          const buttons = Array.from(document.querySelectorAll('button, [role="button"], a'));
          
          for (const btn of buttons) {
            const text = btn.textContent?.trim() ?? '';
            if (closeTexts.includes(text)) {
              // TypeScript safety in evaluate context
              if (btn instanceof HTMLElement) {
                btn.click();
                return true;
              }
            }
          }
          return false;
        });
      }
      
      // Additional attempt: try to click on the specific X button from the screenshot
      await page.evaluate(() => {
        // Find the cookie dialog
        const cookieElements = Array.from(document.querySelectorAll('*')).filter(el => {
          const text = el.textContent?.toLowerCase() ?? '';
          return text.includes('cookie') && window.getComputedStyle(el).display !== 'none';
        });
        
        if (cookieElements.length > 0) {
          // Find any close button within or near the cookie element
          const cookieElement = cookieElements[0];
          if (cookieElement) {
            const closeButton = cookieElement.querySelector('.close') ?? 
                               cookieElement.querySelector('[class*="close"]') ??
                               (cookieElement.parentElement ? cookieElement.parentElement.querySelector('.close') : null);
            
            if (closeButton instanceof HTMLElement) {
              closeButton.click();
            }
          }
        }
      });
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
    return new NextResponse(screenshot, {
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
