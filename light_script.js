const sheets = SpreadsheetApp.openByUrl("REDACTED");
//open spreadsheet by URL (i could have done it by getActiveSpreadsheet instead)
function lightCircleValue() {
 var sheet = sheets.getSheetByName('Sheet1');
//get the 1st sheet
 var range = sheet.getRange('D2:D26');
//get the column of light values as the range to check
 var values = range.getValues();
//get the values in that range
 var flattenedValues = values.flat();
//turn the values into a 1d array
 var lowestValue = flattenedValues.filter(String).pop();
//the array of values is filtered to only show strings and then pop the most recent value
 var otherSheet = sheets.getSheetByName('Sheet2');
//define the 2nd sheet
 var cell1 = otherSheet.getRange('F2').getValue();
 var cell2 = otherSheet.getRange('E2').getValue();
//get the limit values from F2 and E2 in the second sheet
 if (lowestValue >= cell1 && lowestValue <= cell2) {
   Logger.log('The value is between the two values.');
   return '#BFED98';
//if the lowest value down in the column(most recent value) is in between the 2 limits, a green colour is returned 
 } else {
   Logger.log('The value is not between the two values.');
   return '#E37575';
//if the most recent value isn’t between the 2 limits a red colour is returned
 }
}
