/**
 * Google Apps Script Web App for Wedding RSVP + Wishes
 *
 * Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1OyCxGdTj_EegZ6Vc9QA1z1ug1KoEhzaA26YDFjK2po0/edit?usp=sharing
 *
 * Required sheets (auto-generated if not exist):
 * - RSVP
 * - Wishes
 */

const SPREADSHEET_ID = "1OyCxGdTj_EegZ6Vc9QA1z1ug1KoEhzaA26YDFjK2po0";
const RSVP_SHEET_NAME = "RSVP";
const WISH_SHEET_NAME = "Wishes";

function doPost(e: any) {
  return handleRequest_(e);
}

function doGet(e: any) {
  return handleRequest_(e);
}

function handleRequest_(e: any) {
  try {
    const params = parseParams_(e);
    const action = String(params.action || "").trim().toLowerCase();

    if (!action) {
      return jsonResponse_({ ok: false, message: "Missing action" });
    }

    if (action === "rsvp") {
      return jsonResponse_(saveRsvp_(params));
    }

    if (action === "wish") {
      return jsonResponse_(saveWish_(params));
    }

    return jsonResponse_({ ok: false, message: "Invalid action" });
  } catch (error: any) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : "Unexpected error",
    });
  }
}

function saveRsvp_(params: any) {
  const sheet = getSheet_(RSVP_SHEET_NAME);

  ensureHeader_(sheet, [
    "Timestamp",
    "Name",
    "Guests",
    "Attendance",
    "Dietary Notes",
  ]);

  const name = String(params.name || "").trim();
  const guests = String(params.guests || "").trim();
  const dietaryNotes = String(params.dietaryNotes || "").trim();

  if (!name) {
    return { ok: false, message: "Name is required" };
  }

  const attendance = guests === "0" ? "Declined" : "Attending";

  sheet.appendRow([
    new Date(),
    name,
    guests || "1",
    attendance,
    dietaryNotes,
  ]);

  return { ok: true, message: "RSVP saved" };
}

function saveWish_(params: any) {
  const sheet = getSheet_(WISH_SHEET_NAME);

  ensureHeader_(sheet, ["Timestamp", "Name", "Message"]);

  const name = String(params.name || "").trim();
  const message = String(params.message || "").trim();

  if (!name || !message) {
    return { ok: false, message: "Name and message are required" };
  }

  sheet.appendRow([new Date(), name, message]);

  return { ok: true, message: "Wish saved" };
}

function getSheet_(sheetName: string) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  return sheet;
}

function ensureHeader_(sheet: GoogleAppsScript.Spreadsheet.Sheet, headers: string[]) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    // Optional: Make header bold
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
}

function parseParams_(e: any) {
  const params: Record<string, string> = Object.assign({}, (e && e.parameter) || {});

  if (!(e && e.postData && e.postData.contents)) {
    return params;
  }

  const contents = String(e.postData.contents || "").trim();
  if (!contents) {
    return params;
  }

  if (contents.charAt(0) === "{") {
    const json = JSON.parse(contents);
    return Object.assign(params, json);
  }

  const parsed = parseFormEncoded_(contents);
  return Object.assign(params, parsed);
}

function parseFormEncoded_(raw: string) {
  const result: Record<string, string> = {};
  const pairs = String(raw || "").split("&");

  for (let i = 0; i < pairs.length; i++) {
    if (!pairs[i]) continue;
    const parts = pairs[i].split("=");
    const key = decodeURIComponent((parts[0] || "").replace(/\+/g, " "));
    const value = decodeURIComponent((parts.slice(1).join("=") || "").replace(/\+/g, " "));
    if (key) {
      result[key] = value;
    }
  }

  return result;
}

function jsonResponse_(data: any) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    // CORS headers just in case we hit Google Apps Script directly
    // Usually Apps script handles CORS natively for Web Apps, but it doesn't hurt.
}
