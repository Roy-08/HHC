import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    const score = searchParams.get("score");

    if (!name || !score) {
      return NextResponse.json(
        { error: "Name and score are required" },
        { status: 400 }
      );
    }

    // Generate certificate using Puppeteer
    const certificateBuffer = await generateCertificateWithPuppeteer(name, score);

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(certificateBuffer);

    // Return as downloadable PNG file
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="Certificate_${name.replace(
          /\s+/g,
          "_"
        )}.png"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}

async function generateCertificateWithPuppeteer(
  name: string,
  score: string
): Promise<Buffer> {
  let browser;
  
  try {
    // Get current date in "1 Jan 2026" format
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport to certificate dimensions
    await page.setViewport({
      width: 1123,
      height: 794,
      deviceScaleFactor: 2
    });

    // Get the base URL for logo
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

    // Generate HTML content with new template
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Certificate of Participation</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;600;700&family=Cormorant+Garamond:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --burgundy: #8B0000;
            --burgundy-dark: #6B0000;
            --gold-deep: #B8860B;
            --border-gold: #D4AF37;
            --gold-light: #F4E4C1;
            --metallic-gold: linear-gradient(135deg, #C9A961 0%, #F4E4C1 25%, #D4AF37 50%, #F4E4C1 75%, #B8860B 100%);
        }

        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }

        body {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 0;
            margin: 0;
        }

        .cert-canvas {
            width: 1123px;
            height: 794px;
            background: linear-gradient(to bottom, #ffffff 0%, #fefefe 50%, #fcfcfc 100%);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(212, 175, 55, 0.3);
        }

        /* Background Decorations */
        .decoration-layer { 
            position: absolute; 
            inset: 0; 
            z-index: 5; 
            pointer-events: none; 
        }
        
        /* Top Left Corner */
        .tl-gold { 
            width: 520px; 
            height: 200px; 
            background: var(--metallic-gold); 
            clip-path: polygon(0 0, 100% 0, 0 100%); 
            position: absolute; 
            top: 0; 
            left: 0;
            opacity: 0.95;
        }
        .tl-red { 
            width: 490px; 
            height: 185px; 
            background: linear-gradient(135deg, var(--burgundy) 0%, var(--burgundy-dark) 100%); 
            clip-path: polygon(0 0, 100% 0, 0 100%); 
            position: absolute; 
            top: 0; 
            left: 0;
            box-shadow: inset -5px 5px 20px rgba(0,0,0,0.3);
        }

        /* Bottom Right Corner */
        .br-gold { 
            width: 320px; 
            height: 150px; 
            background: var(--metallic-gold); 
            clip-path: polygon(100% 0, 100% 100%, 0 100%); 
            position: absolute; 
            right: 0; 
            bottom: 0;
            opacity: 0.95;
        }
        .br-red { 
            width: 300px; 
            height: 135px; 
            background: linear-gradient(225deg, var(--burgundy) 0%, var(--burgundy-dark) 100%); 
            clip-path: polygon(100% 0, 100% 100%, 0 100%); 
            position: absolute; 
            right: 0; 
            bottom: 0;
            box-shadow: inset 5px -5px 20px rgba(0,0,0,0.3);
        }

        /* Vertical Ribbon */
        .v-ribbon { 
            position: absolute; 
            right: 15px; 
            top: 0; 
            bottom: 0; 
            width: 35px; 
            background: var(--metallic-gold);
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2), -3px 0 10px rgba(212, 175, 55, 0.4);
        }

        /* Top Flag */
        .top-flag { 
            position: absolute; 
            top: 0; 
            right: 8px; 
            width: 48px; 
            height: 150px; 
            background: linear-gradient(180deg, var(--burgundy) 0%, var(--burgundy-dark) 100%); 
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* Premium Gold Border */
        .main-frame { 
            position: absolute; 
            inset: 30px; 
            border: 3px solid var(--border-gold); 
            z-index: 2;
            box-shadow: inset 0 0 0 1px var(--gold-light), 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .main-frame::before {
            content: '';
            position: absolute;
            inset: 8px;
            border: 1px solid var(--border-gold);
            opacity: 0.5;
        }

        /* Logo Positioning */
        .logo-container {
            position: absolute;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 15;
            width: 160px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
        }

        /* Rosette Badge */
        .rosette-container {
            position: absolute;
            left: 5px;
            top: 90px;
            z-index: 16;
            transform: scale(0.95);
            filter: drop-shadow(0 10px 25px rgba(0,0,0,0.3));
        }

        .rosette-ribbons::before, 
        .rosette-ribbons::after {
            content: ""; 
            position: absolute;
            width: 42px; 
            height: 100px;
            background: linear-gradient(180deg, var(--burgundy) 0%, var(--burgundy-dark) 100%);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
            border: 2px solid var(--border-gold);
            top: 90px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.4);
        }
        .rosette-ribbons::before { 
            transform: rotate(15deg); 
            left: 10px; 
        }
        .rosette-ribbons::after { 
            transform: rotate(-15deg); 
            right: 10px; 
        }

        .rosette-gold {
            width: 145px; 
            height: 145px;
            background: var(--metallic-gold);
            border-radius: 50%;
            border: 5px double var(--gold-deep);
            position: relative;
            box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.3);
        }

        /* Content Area */
        .inner-content {
            position: relative;
            z-index: 10;
            text-align: center;
            width: 82%;
            margin-top: 140px;
        }

        h1 {
            font-size: 88px;
            letter-spacing: 18px;
            color: #1a1a1a;
            text-transform: uppercase;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
            margin-bottom: 5px;
        }

        .participation {
            font-family: 'Montserrat', sans-serif;
            font-size: 26px;
            color: #ffffff;
            background: var(--burgundy);
            letter-spacing: 12px;
            font-weight: 700;
            margin-bottom: 30px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
            padding: 12px 40px;
            border: 3px solid var(--border-gold);
            display: inline-block;
            box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
        }

        .intro-text {
            font-style: italic; 
            font-size: 19px; 
            color: #555; 
            font-family: 'Cormorant Garamond', serif;
            font-weight: 400;
            margin-bottom: 15px;
        }

        .name {
            font-family: 'Great Vibes', cursive;
            font-size: 70px;
            color: #000;
            border-bottom: 3px solid var(--border-gold);
            display: inline-block;
            padding: 0 70px 10px;
            margin: 10px 0 25px 0;
            line-height: 1;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.08);
            position: relative;
        }

        .name::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--gold-light), transparent);
        }

        .desc-text {
            font-size: 18px;
            line-height: 1.8;
            max-width: 780px;
            margin: 0 auto;
            color: #333;
            font-family: 'Cormorant Garamond', serif;
            font-weight: 700;
        }

        .desc-text strong {
            color: var(--burgundy);
            font-weight: 700;
        }

        /* Footer Layout */
        .footer {
            position: absolute;
            bottom: 55px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 150px;
            z-index: 10;
            align-items: center;
        }

        .sig-group {
            width: 340px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .sig-font {
            font-family: 'Great Vibes', cursive;
            font-size: 45px;
            color: #000;
            margin-bottom: -8px;
            height: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }

        .sig-line {
            width: 100%;
            border-top: 2px solid #2a2a2a;
            margin-bottom: 12px;
            position: relative;
        }

        .sig-line::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 0;
            right: 0;
            border-top: 1px solid rgba(212, 175, 55, 0.3);
        }

        .sig-label {
            font-family: 'Montserrat', sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: var(--burgundy);
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .sig-sub {
            font-size: 12px;
            color: #666;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            margin-top: 5px;
            font-style: italic;
        }

        /* Subtle decorative elements */
        .ornament {
            position: absolute;
            width: 60px;
            height: 60px;
            opacity: 0.15;
        }

        .ornament-tl {
            top: 60px;
            left: 60px;
            border-top: 2px solid var(--border-gold);
            border-left: 2px solid var(--border-gold);
        }

        .ornament-tr {
            top: 60px;
            right: 60px;
            border-top: 2px solid var(--border-gold);
            border-right: 2px solid var(--border-gold);
        }

        .ornament-bl {
            bottom: 60px;
            left: 60px;
            border-bottom: 2px solid var(--border-gold);
            border-left: 2px solid var(--border-gold);
        }

        .ornament-br {
            bottom: 60px;
            right: 60px;
            border-bottom: 2px solid var(--border-gold);
            border-right: 2px solid var(--border-gold);
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }
            .cert-canvas {
                box-shadow: none;
            }
        }

    </style>
</head>
<body>

    <div class="cert-canvas">
        <div class="main-frame"></div>

        <!-- Subtle corner ornaments -->
        <div class="ornament ornament-tl"></div>
        <div class="ornament ornament-tr"></div>
        <div class="ornament ornament-bl"></div>
        <div class="ornament ornament-br"></div>

        <!-- Logo -->
        <div class="logo-container">
            <img src="${logoUrl}" alt="Dr. Vrushali Logo" onerror="this.style.display='none'">
        </div>

        <div class="decoration-layer">
            <div class="tl-gold"></div>
            <div class="tl-red"></div>
            <div class="br-gold"></div>
            <div class="br-red"></div>
            <div class="v-ribbon"></div>
            <div class="top-flag"></div>
        </div>

        <div class="rosette-container">
            <div class="rosette-ribbons"></div>
            <div class="rosette-gold"></div>
        </div>

        <div class="inner-content">
            <h1>Certificate</h1>
            <div class="participation">OF PARTICIPATION</div>

            <p class="intro-text">This recognition is proudly presented to:</p>
            <div class="name">${name}</div>

            <p class="desc-text">
                has successfully completed <strong>The Happiness Index Assessment</strong> based on The Joy Spectrum Framework and has taken a meaningful step towards greater self-awareness, emotional clarity, and well-being.
            </p>
        </div>

        <div class="footer">
            <div class="sig-group">
                <div class="sig-font">${formattedDate}</div>
                <div class="sig-line"></div>
                <div class="sig-label">Date of Issuance</div>
            </div>
            <div class="sig-group">
                <div class="sig-font">Dr. Vrushali</div>
                <div class="sig-line"></div>
                <div class="sig-label">Dr. Vrushali Saraswat</div>
                <div class="sig-sub">Holistic Happiness Coach</div>
            </div>
        </div>
    </div>

</body>
</html>
    `;

    // Set content and wait for everything to load
    await page.setContent(htmlContent, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });

    return Buffer.from(screenshot);

  } catch (error) {
    console.error("Puppeteer error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}