function updateLightGraphRange() {
  // Replace "Sheet1" with the name of your sheet
  var sheet = sheets.getSheetByName("Sheet1");
  var othersheet = sheets.getSheetByName("Sheet2");
  // Replace "M2:N41" with the range that you want to process
  var range = sheet.getRange("B43:C93");
  var values = range.getValues();
  
  // Replace "O" with the column letter that you want to update
  var updateColumn = "C";
  var updateColumnNumber = sheet.getRange(updateColumn + "1").getColumn();
  // Replace "D1" and "E1" with the cell references for the lower and upper bounds
  var lowerBound = othersheet.getRange("F2").getValue();
  var upperBound = othersheet.getRange("E2").getValue();
  
  for (var i = 0; i < values.length; i++) {
    var columnBValue = values[i][0];
    var columnCValue = values[i][1];
    
    if (columnBValue >= lowerBound && columnBValue <= upperBound) {
      sheet.getRange(i+43, updateColumnNumber).setValue(1); // +2 because the range starts at row 2
    }
    else {
      sheet.getRange(i+43, updateColumnNumber).setValue(0);
    }
  }
}
