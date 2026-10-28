// Wyizeman — Partner Lead intake
// Paste this into the Apps Script editor attached to your Google Sheet.
// See setup steps given separately (Extensions > Apps Script > paste > Deploy as Web App).

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('leads') || ss.getActiveSheet();
  var p = e.parameter;

  // Honeypot — if this hidden field is filled, it's almost certainly a bot.
  // Silently accept without writing a row, so the bot doesn't learn anything either way.
  if (p.website) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Column order: Timestamp | Partner Code | Lead Name | Lead Phone | Lead Email
  //               | Lead City | Interested In | Budget | Notes
  sheet.appendRow([
    new Date(),
    p.partner_code || '',
    p.lead_name || '',
    p.lead_phone || '',
    p.lead_email || '',
    p.lead_city || '',
    p.interest || '',
    p.budget || '',
    p.notes || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('Wyizeman partner-lead endpoint is live.');
}
