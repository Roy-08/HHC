import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Get all sheet tabs
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const allSheets = spreadsheet.data.sheets || [];

    // Filter out the main "Test_Data" tab and any other system tabs
    const excludedTabs = ["test_data", "sheet1"];
    const volunteerSheets = allSheets.filter(
      (s) =>
        !excludedTabs.includes(
          (s.properties?.title || "").toLowerCase()
        )
    );

    // Get submission count for each volunteer tab
    const volunteers = await Promise.all(
      volunteerSheets.map(async (s) => {
        const tabName = s.properties?.title || "";
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${tabName}!A:A`,
          });
          const rows = response.data.values || [];
          // Subtract 1 for the header row
          const count = Math.max(0, rows.length - 1);
          return {
            name: tabName,
            submissions: count,
            referralLink: `https://happiness-index.vercel.app/?ref=${encodeURIComponent(tabName)}`,
          };
        } catch {
          return {
            name: tabName,
            submissions: 0,
            referralLink: `https://happiness-index.vercel.app/?ref=${encodeURIComponent(tabName)}`,
          };
        }
      })
    );

    return NextResponse.json({ volunteers });
  } catch (err) {
    console.error("Error listing volunteers:", err);
    return NextResponse.json(
      { error: "Failed to list volunteers" },
      { status: 500 }
    );
  }
}