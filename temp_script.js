const sheets = SpreadsheetApp.openByUrl("REDACTED");
function tempCircleValue() {
 // Get the values in the specified range of cells in the specific sheet
 var sheet = sheets.getSheetByName('Sheet1');
 var range = sheet.getRange('C2:C26');
 var values = range.getValues();
 var flattenedValues = values.flat();
  // Get the lowest non-empty value in the range
 var lowestValue = flattenedValues.filter(String).pop();
  // Get the values of the two cells in the other sheet
 var otherSheet = sheets.getSheetByName('Sheet2');
 var cell1 = otherSheet.getRange('B2').getValue();
 var cell2 = otherSheet.getRange('A2').getValue();
  // Check if the lowest value is between the two values
 if (lowestValue >= cell1 && lowestValue <= cell2) {
   Logger.log('The value is between the two values.');
   return '#BFED98';
//return green
 } else {
   Logger.log('The value is not between the two values.');
   return '#E37575';
//return red
 }
}
