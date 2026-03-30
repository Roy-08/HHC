import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Volunteer name is required" },
        { status: 400 }
      );
    }

    const volunteerName = name.trim();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Check if a tab with this name already exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets || [];
    const tabExists = existingSheets.some(
      (s) => s.properties?.title?.toLowerCase() === volunteerName.toLowerCase()
    );

    if (tabExists) {
      return NextResponse.json(
        { error: "A volunteer with this name already exists" },
        { status: 409 }
      );
    }

    // Create a new tab in the existing sheet
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: volunteerName,
              },
            },
          },
        ],
      },
    });

    // Add headers to the new tab (same as Test_Data)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${volunteerName}!A1:M1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            "Timestamp",
            "Name",
            "Email",
            "Mobile",
            "DOB",
            "Gender",
            "Country",
            "Occupation",
            "Score",
            "Category",
            "Mail Status",
            "Language",
            "Volunteer",
          ],
        ],
      },
    });

    const referralLink = `https://happiness-index.vercel.app/?ref=${encodeURIComponent(volunteerName)}`;

    return NextResponse.json({
      message: "Volunteer created successfully",
      volunteer: volunteerName,
      referralLink,
    });
  } catch (err) {
    console.error("Error creating volunteer:", err);
    return NextResponse.json(
      { error: "Failed to create volunteer" },
      { status: 500 }
    );
  }
}