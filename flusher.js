function clearValues() {
  var range = SpreadsheetApp.getActiveSpreadsheet().getRange('Sheet1!B2:D26');
  range.clearContent();
}