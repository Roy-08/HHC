import { NextResponse } from "next/server";
import { google } from "googleapis";
import puppeteer from "puppeteer-core";
import chrome from "@sparticuz/chromium";

export async function POST(req: Request) {
  try {
    const { name, email, mobile, dob, gender, country, occupation, totalScore, answers } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Determine category based on score
    const category = getCategory(totalScore);

    // Generate certificate as base64
    const certificateBase64 = await generateCertificateBase64(name, totalScore.toString());

    // Send email with PDF link and embedded certificate
    let mailStatus = "Sent";
    try {
      await sendEmail({ name, email, totalScore, category, certificateBase64 });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      mailStatus = "Failed";
    }

    // Save to Google Sheets
    try {
      await saveToGoogleSheets({
        name,
        email,
        mobile,
        dob,
        gender,
        country,
        occupation,
        totalScore,
        category,
        mailStatus
      });
    } catch (sheetError) {
      console.error("Google Sheets save failed:", sheetError);
    }

    return NextResponse.json({
      message: "Quiz submitted successfully",
      score: totalScore,
      category,
      mailStatus
    });

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* -----------------------------
   CATEGORY HELPER
----------------------------- */
function getCategory(score: number): string {
  if (score < 45) return "Seeker";
  if (score <= 59) return "Creator";
  if (score <= 74) return "Innovator";
  if (score <= 89) return "Prodigy";
  return "Luminary";
}

function getPdfName(score: number): string {
  if (score < 45) return "Seeker.pdf";
  if (score <= 59) return "Creator.pdf";
  if (score <= 74) return "Innovator.pdf";
  if (score <= 89) return "Prodigy.pdf";
  return "Luminary.pdf";
}

/* -----------------------------
   GENERATE CERTIFICATE AS BASE64
----------------------------- */
async function generateCertificateBase64(name: string, score: string): Promise<string> {
  const certificateBuffer = await generateCertificateWithPuppeteer(name, score);
  return certificateBuffer.toString('base64');
}

/* -----------------------------
   GENERATE CERTIFICATE WITH PUPPETEER
----------------------------- */
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

    // Launch Puppeteer with Chromium for Vercel
    const isProduction = process.env.NODE_ENV === 'production';

    browser = await puppeteer.launch({
      args: isProduction ? chrome.args : [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
      defaultViewport: {
        width: 1123,
        height: 794
      },
      executablePath: isProduction 
        ? await chrome.executablePath()
        : process.platform === 'win32'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : '/usr/bin/google-chrome',
      headless: true,
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
</html>`;

    await page.setContent(htmlContent, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });

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

console.log("📧 Gmail ENV check:", {
  clientId: !!process.env.GMAIL_CLIENT_ID,
  clientSecret: !!process.env.GMAIL_CLIENT_SECRET,
  refreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
  fromEmail: !!process.env.GMAIL_EMAIL,
});

async function sendEmail({ 
  name, 
  email, 
  totalScore, 
  category,
  certificateBase64
}: { 
  name: string; 
  email: string; 
  totalScore: number; 
  category: string;
  certificateBase64: string;
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const pdfFileName = getPdfName(totalScore);
    const pdfUrl = `${baseUrl}/${pdfFileName}`;

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    try {
      const token = await oAuth2Client.getAccessToken();
      console.log("🔑 Gmail access token generated:", !!token?.token);
    } catch (tokenErr) {
      console.error("❌ Failed to get Gmail access token:", tokenErr);
    }

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const htmlContent = generateHTMLEmail(name, totalScore, category, pdfUrl, certificateBase64);

    const rawMessage = [
      `From: Dr. Vrushali <${process.env.GMAIL_EMAIL}>`,
      `To: ${email}`,
      "Subject: Your Happiness Index Score & Report",
      "Content-Type: text/html; charset=UTF-8",
      "",
      htmlContent,
    ].join("\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    console.log("✅ Email sent to:", email);
  } catch (err) {
    console.error("❌ Email failed:", err);
    throw err;
  }
}

/* -----------------------------
   SAVE TO GOOGLE SHEETS
----------------------------- */
async function saveToGoogleSheets(data: {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  gender: string;
  country: string;
  occupation: string;
  totalScore: number;
  category: string;
  mailStatus: string;
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Test_Data!A:J";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.name,
            data.email,
            data.mobile,
            data.dob,
            data.gender,
            data.country,
            data.occupation,
            data.totalScore,
            data.category,
            data.mailStatus,
          ],
        ],
      },
    });
    console.log("✅ Data saved to Google Sheets");
  } catch (err) {
    console.error("❌ Google Sheets error:", err);
    throw err;
  }
}

function getHappinessCategory(score: number): string {
  if (score < 45) return "Low Happiness";
  if (score <= 59) return "Moderate Happiness";
  if (score <= 74) return "Good Happiness";
  if (score <= 89) return "High Happiness";
  return "Exceptional Happiness";
}

function generateHTMLEmail(
  name: string, 
  score: number, 
  category: string, 
  pdfUrl: string,
  certificateBase64: string
): string {
  const happinessCategory = getHappinessCategory(score);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
        min-width: 100% !important;
      }
      .mobile-padding {
        padding: 20px !important;
      }
      .mobile-padding-small {
        padding: 12px 15px !important;
      }
      .mobile-text-center {
        text-align: center !important;
      }
      .mobile-font-small {
        font-size: 13px !important;
      }
      .mobile-heading {
        font-size: 24px !important;
      }
      .mobile-subheading {
        font-size: 14px !important;
      }
      .mobile-divider {
        width: 100% !important;
      }
      .mobile-header {
        font-size: 11px !important;
        letter-spacing: 1.5px !important;
        padding: 12px 15px !important;
      }
      .mobile-welcome {
        font-size: 10px !important;
        letter-spacing: 2px !important;
      }
      .mobile-subtitle {
        font-size: 14px !important;
        max-width: 280px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        word-wrap: break-word !important;
      }
      .mobile-button {
        padding: 10px 18px !important;
        font-size: 12px !important;
      }
      .button-container {
        display: inline-block !important;
        margin: 6px 4px !important;
      }
      .social-icon-cell {
        padding: 0 8px !important;
      }
      .certificate-img {
        max-width: 100% !important;
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#fffbea; font-family:Arial, Helvetica, sans-serif; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color:#fffbea;">
  <tr>
    <td align="center" style="padding:40px 10px;">
      
      <table class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" role="presentation" style="
        max-width:600px;
        width:100%;
        background-color:#ffffff;
        border-radius:30px;
        overflow:hidden;
        box-shadow:0 20px 60px rgba(0,0,0,0.08);
        border:1px solid #f7f1c6;
      ">

        <!-- Header -->
        <tr>
          <td class="mobile-header mobile-padding-small" style="
            padding:14px 40px;
            font-size:13px;
            letter-spacing:2px;
            color:#2b4d36;
            background:linear-gradient(90deg, #fff9d9, #fffef0);
            border-bottom:1px solid #f5eec2;
            font-weight:600;
            line-height:1.4;
            text-align:center;
            font-family:Arial, Helvetica, sans-serif;
          ">
            HAPPINESS INDEX REPORT
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td class="mobile-padding" align="center" style="padding:30px 35px 20px 35px;">
            <p class="mobile-welcome" style="font-size:12px; letter-spacing:3px; color:#666666; margin:0 0 8px 0; line-height:1.4; font-family:Arial, Helvetica, sans-serif;">
              WELCOME TO YOUR
            </p>

            <h1 class="mobile-heading" style="
              font-family:Georgia, 'Times New Roman', serif;
              font-size:32px;
              font-weight:700;
              margin:0;
              color:#1b6b36;
              line-height:1.3;
            ">
              Happiness Assessment Report
            </h1>

            <p class="mobile-subtitle mobile-subheading" style="
              font-size:18px;
              color:#777777;
              margin:10px 0 0 0;
              font-family:Georgia, 'Times New Roman', serif;
              line-height:1.4;
            ">
              Your personalised emotional wellness insights
            </p>

            <table class="mobile-divider" width="80%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:15px auto 0 auto;">
              <tr>
                <td style="height:2px; background-color:#f2e9b3;"></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td class="mobile-padding" style="padding:0 45px 22px 45px; color:#355a41; line-height:1.6; font-family:Arial, Helvetica, sans-serif;">

            <p class="mobile-font-small" style="font-size:15px; margin:0 0 12px 0; color:#355a41;">
              Dear <strong style="color:#1b6b36;">${name}</strong>,
            </p>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 12px 0; line-height:1.6;">
              Thank you for taking the Happiness Index (HI) and reflecting on your emotional well-being.
            </p>

            <p class="mobile-font-small" style="font-size:14px; color:#2f4e39; margin:0 0 12px 0; line-height:1.6;">
              Your score is
              <strong style="color:#1b6b36; font-size:16px;">${score}</strong>,
              placing you in the
              <strong style="color:#1b6b36;">${happinessCategory}</strong> category.
            </p>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 12px 0; line-height:1.6;">
              Please find below your personalised Happiness Index Report and your Certificate of Participation as a token of appreciation for your effort.
            </p>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 18px 0; line-height:1.6;">
              We hope the insights help you gain clarity and awareness.
            </p>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 18px 0; line-height:1.6;">
              If you found this meaningful, we encourage you to share the Happiness Index with people you care about - a small step that can make a real difference.
            </p>

            <!-- Certificate Image (Embedded) -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:25px 0;">
              <tr>
                <td align="center">
                  <p class="mobile-font-small" style="font-size:13px; color:#666666; margin:0 0 15px 0; text-align:center; line-height:1.4;">
                    Your Certificate of Participation
                  </p>
                  <img src="data:image/png;base64,${certificateBase64}" 
                       alt="Certificate of Participation"
                       class="certificate-img"
                       style="max-width:100%; height:auto; border:2px solid #d4af37; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); display:block;"
                       width="550" />
                </td>
              </tr>
            </table>

            <!-- Download Report Button -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:20px 0 15px 0;">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" class="button-container" style="display:inline-block; margin:0 6px 12px 6px;">
                    <tr>
                      <td align="center" style="border-radius:25px; background:linear-gradient(135deg, #1b6b36, #2d8a4d);">
                        <a href="${pdfUrl}" target="_blank" class="mobile-button" style="
                          display:inline-block;
                          padding:12px 24px;
                          font-family:Arial, Helvetica, sans-serif;
                          font-size:13px;
                          font-weight:600;
                          color:#ffffff;
                          text-decoration:none;
                          border-radius:25px;
                          letter-spacing:0.3px;
                        ">
                          📄 View Detailed Report
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Footer -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-top:1px solid #f7eeb4; padding-top:20px; margin-top:10px;">
              <tr>
                <td align="center">

                  <p style="font-size:15px; color:#666666; margin:0 0 8px 0; line-height:1.4; font-family:Arial, Helvetica, sans-serif;">
                    <strong>Stay Happy, Stay Healthy</strong>
                  </p>

                  <p style="margin:0; font-family:'Brush Script MT','Apple Chancery',cursive; font-size:18px; color:#d4af37; font-weight:700; line-height:1.2;">
                    Dr. Vrushali
                  </p>

                  <p style="margin:5px 0 15px 0; font-family: 'Comic Sans MS', 'Trebuchet MS', Arial, sans-serif; font-size:18px; color:#2f4e39; line-height:1.3;">
                    Happiness Coach
                  </p>

                  <!-- Social Media Icons -->
                  <table align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:15px;">
                    <tr>

                      <!-- Facebook (LEFT) -->
                      <td align="left" width="33%" class="social-icon-cell" style="padding:0 15px;">
                        <a href="https://www.facebook.com/vrushali.saraswat">
                          <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td width="50" height="50" align="center" valign="middle" 
                                  style="
                                    border-radius:50%;
                                    border:4px solid #d4af37;
                                    background:#ffffff;
                                  ">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                                     width="28" height="28" style="display:block;">
                              </td>
                            </tr>
                          </table>
                        </a>
                      </td>

                      <!-- LinkedIn (CENTER) -->
                      <td align="center" width="33%" class="social-icon-cell">
                        <a href="https://www.linkedin.com/in/dr-vrushalisaraswat/">
                          <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td width="50" height="50" align="center" valign="middle" 
                                  style="
                                    border-radius:50%;
                                    border:4px solid #d4af37;
                                    background:#ffffff;
                                  ">
                                <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                                     width="28" height="28" style="display:block;">
                              </td>
                            </tr>
                          </table>
                        </a>
                      </td>

                      <!-- Instagram (RIGHT) -->
                      <td align="right" width="33%" class="social-icon-cell" style="padding:0 15px;">
                        <a href="https://www.instagram.com/happinesswithdrvrushali/">
                          <table cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td width="50" height="50" align="center" valign="middle" 
                                  style="
                                    border-radius:50%;
                                    border:4px solid #d4af37;
                                    background:#ffffff;
                                  ">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                     width="28" height="28" style="display:block;">
                              </td>
                            </tr>
                          </table>
                        </a>
                      </td>

                    </tr>
                  </table>

                </td>
              </tr>
            </table>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
</body>
</html>
`;
}
