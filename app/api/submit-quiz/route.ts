import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { name, email, mobile, dob, gender, country, occupation, totalScore, answers } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Determine category based on score
    const category = getCategory(totalScore);

    // Send email with PDF link and certificate link
    let mailStatus = "Sent";
    try {
      await sendEmail({ name, email, totalScore, category });
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
  category
}: { 
  name: string; 
  email: string; 
  totalScore: number; 
  category: string;
}) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const pdfFileName = getPdfName(totalScore);
    const pdfUrl = `${baseUrl}/${pdfFileName}`;
    
    // Generate certificate download URL with query parameters
    const certificateUrl = `${baseUrl}/api/certificate?name=${encodeURIComponent(name)}&score=${totalScore}`;

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

    const htmlContent = generateHTMLEmail(name, totalScore, category, pdfUrl, certificateUrl);

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

function getExplanation(score: number): string {
  if (score < 45)
    return "This score indicates a low level of happiness. You may be experiencing stress, dissatisfaction, or challenges in emotional well-being. This range suggests there is significant room for improvement.";

  if (score <= 59)
    return "This score reflects a moderate level of happiness. You likely experience a mix of positive and negative emotions, with some areas of life needing attention or improvement.";

  if (score <= 74)
    return "This score reflects a good level of happiness and emotional balance. You're doing well overall but may still have certain areas where further growth or fulfillment is possible.";

  if (score <= 89)
    return "This score indicates a high level of happiness. You experience strong emotional well-being, positivity, and life satisfaction, with good resilience and purpose.";

  return "This score reflects exceptional happiness and well-being. You are experiencing very high positivity, fulfillment, gratitude, and a deep sense of purpose in life.";
}

function getFeedback(score: number): string {
  if (score < 45)
    return "Your score suggests you're facing emotional challenges, but remember—this is a powerful moment for growth. With intentional steps like practicing gratitude, improving routines, and nurturing connections, meaningful change is possible. Our Happiness Reset program provides structured guidance to help you rebuild joy and emotional balance. You deserve a happier life—let's begin this journey together.";

  if (score <= 59)
    return "You're building a foundation of happiness, and with the right support, you can elevate it further. Consider focusing on activities that bring you joy and purpose. Our Happiness Reset program can help you develop emotional resilience, strengthen relationships, and boost life satisfaction. You're closer to deeper happiness than you think!";

  if (score <= 74)
    return "Great job! You have a strong base of happiness and emotional balance. With a bit of focus, you can grow even further. Our program is designed to help you deepen your joy, find more meaning, and strengthen well-being through proven practices. You're on an amazing path—let's elevate your happiness to the next level.";

  if (score <= 89)
    return "Congratulations! You are thriving emotionally with high levels of well-being. Now, imagine taking this even further. Our course offers advanced tools in gratitude, mindfulness, and emotional mastery to help you sustain and grow your happiness. You're doing amazing—let's build on this momentum together.";

  return "Outstanding! Your happiness level is exceptional, reflecting profound fulfillment and inner alignment. To continue expanding this incredible energy, our program offers powerful strategies for purpose, joy, and long-term emotional resilience. You're shining brightly—keep growing and inspiring others along the way!";
}

function generateHTMLEmail(
  name: string, 
  score: number, 
  category: string, 
  pdfUrl: string,
  certificateUrl: string
): string {
  const happinessCategory = getHappinessCategory(score);
  const explanation = getExplanation(score);
  const feedback = getFeedback(score);

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
        display: block !important;
        margin: 6px 4px !important;
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

            <h2 class="mobile-subheading" style="font-family:Georgia, 'Times New Roman', serif; font-size:18px; margin:15px 0 8px 0; color:#1b6b36; line-height:1.3; font-weight:600;">
              Your Results
            </h2>

            <p class="mobile-font-small" style="font-size:14px; color:#2f4e39; margin:0 0 12px 0; line-height:1.6;">
              Your overall score is
              <strong style="color:#1b6b36; font-size:16px;">${score}</strong>,
              placing you in the
              <strong style="color:#1b6b36;">${happinessCategory}</strong> category.
            </p>

            <h2 class="mobile-subheading" style="font-family:Georgia, 'Times New Roman', serif; font-size:18px; margin:15px 0 8px 0; color:#1b6b36; line-height:1.3; font-weight:600;">
              Explanation
            </h2>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 12px 0; line-height:1.6;">
              ${explanation}
            </p>

            <h2 class="mobile-subheading" style="font-family:Georgia, 'Times New Roman', serif; font-size:18px; margin:15px 0 8px 0; color:#1b6b36; line-height:1.3; font-weight:600;">
              Suggestion
            </h2>

            <p class="mobile-font-small" style="font-size:14px; color:#3d5a46; margin:0 0 18px 0; line-height:1.6;">
              ${feedback}
            </p>

            <p class="mobile-font-small" style="font-size:13px; color:#666666; margin:0 0 12px 0; text-align:center; line-height:1.4;">
              Download your personalized documents below
            </p>

            <!-- Download Buttons (Side by Side) -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:12px 0 15px 0;">
              <tr>
                <td align="center">
                  
                  <!-- Download Report Button -->
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" class="button-container" style="display:inline-block; margin:0 6px 12px 6px; vertical-align:top;">
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
                          📄 Download Report
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Download Certificate Button -->
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" class="button-container" style="display:inline-block; margin:0 6px 12px 6px; vertical-align:top;">
                    <tr>
                      <td align="center" style="border-radius:25px; background:linear-gradient(135deg, #d4af37, #f4c542);">
                        <a href="${certificateUrl}" target="_blank" class="mobile-button" style="
                          display:inline-block;
                          padding:12px 24px;
                          font-family:Arial, Helvetica, sans-serif;
                          font-size:13px;
                          font-weight:600;
                          color:#2b4d36;
                          text-decoration:none;
                          border-radius:25px;
                          letter-spacing:0.3px;
                        ">
                          🏆 Download Certificate
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

                  <p style="margin:5px 0 0 0; font-family: 'Comic Sans MS', 'Trebuchet MS', Arial, sans-serif; font-size:18px; color:#2f4e39; line-height:1.3;">
                    Happiness Coach
                  </p>

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
