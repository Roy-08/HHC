// ============================================================
// FILE: app/api/volunteers/create/route.ts
// COPY THIS FILE to your Next.js project at the path above
// ============================================================

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
    const addSheetResponse = await sheets.spreadsheets.batchUpdate({
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

    // Get the new sheet's ID for formatting
    const newSheetId =
      addSheetResponse.data.replies?.[0]?.addSheet?.properties?.sheetId;

    // Add headers to the new tab
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

    // Now apply formatting to the header row and add data validation
    if (newSheetId !== undefined && newSheetId !== null) {
      const formatRequests: any[] = [
        // 1. Format header row - Bold white text on gradient pink/purple background
        {
          repeatCell: {
            range: {
              sheetId: newSheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 13,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: {
                  red: 0.82,
                  green: 0.16,
                  blue: 0.44,
                }, // #D12970 - Deep Pink
                textFormat: {
                  foregroundColor: {
                    red: 1,
                    green: 1,
                    blue: 1,
                  },
                  bold: true,
                  fontSize: 11,
                  fontFamily: "Arial",
                },
                horizontalAlignment: "CENTER",
                verticalAlignment: "MIDDLE",
                padding: {
                  top: 6,
                  bottom: 6,
                  left: 8,
                  right: 8,
                },
                borders: {
                  bottom: {
                    style: "SOLID_MEDIUM",
                    color: { red: 0.6, green: 0.1, blue: 0.35 },
                  },
                },
              },
            },
            fields:
              "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,padding,borders)",
          },
        },

        // 2. Freeze the header row
        {
          updateSheetProperties: {
            properties: {
              sheetId: newSheetId,
              gridProperties: {
                frozenRowCount: 1,
              },
            },
            fields: "gridProperties.frozenRowCount",
          },
        },

        // 3. Set column widths for better readability
        // Timestamp (A) - 160px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: 1,
            },
            properties: { pixelSize: 160 },
            fields: "pixelSize",
          },
        },
        // Name (B) - 140px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 1,
              endIndex: 2,
            },
            properties: { pixelSize: 140 },
            fields: "pixelSize",
          },
        },
        // Email (C) - 220px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 2,
              endIndex: 3,
            },
            properties: { pixelSize: 220 },
            fields: "pixelSize",
          },
        },
        // Mobile (D) - 130px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 3,
              endIndex: 4,
            },
            properties: { pixelSize: 130 },
            fields: "pixelSize",
          },
        },
        // DOB (E) - 110px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 4,
              endIndex: 5,
            },
            properties: { pixelSize: 110 },
            fields: "pixelSize",
          },
        },
        // Gender (F) - 90px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 5,
              endIndex: 6,
            },
            properties: { pixelSize: 90 },
            fields: "pixelSize",
          },
        },
        // Country (G) - 120px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 6,
              endIndex: 7,
            },
            properties: { pixelSize: 120 },
            fields: "pixelSize",
          },
        },
        // Occupation (H) - 130px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 7,
              endIndex: 8,
            },
            properties: { pixelSize: 130 },
            fields: "pixelSize",
          },
        },
        // Score (I) - 80px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 8,
              endIndex: 9,
            },
            properties: { pixelSize: 80 },
            fields: "pixelSize",
          },
        },
        // Category (J) - 110px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 9,
              endIndex: 10,
            },
            properties: { pixelSize: 110 },
            fields: "pixelSize",
          },
        },
        // Mail Status (K) - 120px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 10,
              endIndex: 11,
            },
            properties: { pixelSize: 120 },
            fields: "pixelSize",
          },
        },
        // Language (L) - 100px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 11,
              endIndex: 12,
            },
            properties: { pixelSize: 100 },
            fields: "pixelSize",
          },
        },
        // Volunteer (M) - 120px
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "COLUMNS",
              startIndex: 12,
              endIndex: 13,
            },
            properties: { pixelSize: 120 },
            fields: "pixelSize",
          },
        },

        // 4. Set header row height
        {
          updateDimensionProperties: {
            range: {
              sheetId: newSheetId,
              dimension: "ROWS",
              startIndex: 0,
              endIndex: 1,
            },
            properties: { pixelSize: 40 },
            fields: "pixelSize",
          },
        },

        // 5. Add data validation dropdown for "Mail Status" column (K, index 10)
        // Apply to rows 2-1000 for future data
        {
          setDataValidation: {
            range: {
              sheetId: newSheetId,
              startRowIndex: 1,
              endRowIndex: 1000,
              startColumnIndex: 10,
              endColumnIndex: 11,
            },
            rule: {
              condition: {
                type: "ONE_OF_LIST",
                values: [
                  { userEnteredValue: "Sent" },
                  { userEnteredValue: "Failed" },
                  { userEnteredValue: "Pending" },
                ],
              },
              showCustomUi: true,
              strict: false,
            },
          },
        },

        // 6. Add alternating row colors (banding) for better readability
        {
          addBanding: {
            bandedRange: {
              range: {
                sheetId: newSheetId,
                startRowIndex: 0,
                endRowIndex: 1000,
                startColumnIndex: 0,
                endColumnIndex: 13,
              },
              rowProperties: {
                headerColor: {
                  red: 0.82,
                  green: 0.16,
                  blue: 0.44,
                },
                firstBandColor: {
                  red: 1,
                  green: 1,
                  blue: 1,
                },
                secondBandColor: {
                  red: 0.98,
                  green: 0.94,
                  blue: 0.96,
                }, // Light pink tint
              },
            },
          },
        },
      ];

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: formatRequests,
        },
      });
    }

    const referralLink = `https://happiness-index.vercel.app/?ref=${encodeURIComponent(
      volunteerName
    )}`;

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
