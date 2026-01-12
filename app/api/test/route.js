import { getSheets } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const { name } = await req.json();

    const sheets = getSheets();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const tabName = `Test_${Date.now()}`;

    // 1️⃣ Create new tab
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title: tabName },
            },
          },
        ],
      },
    });

    // 2️⃣ Insert data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          ["name", "created_at"],
          [name, new Date().toISOString()],
        ],
      },
    });

    return Response.json({
      success: true,
      sheet: tabName,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
