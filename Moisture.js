function updateMoistureGraphRange() {
  // Replace "Sheet1" with the name of your sheet
  var sheet = sheets.getSheetByName("Sheet1");
  var othersheet = sheets.getSheetByName("Sheet2");
  // Replace "M2:N41" with the range that you want to process
  var range = sheet.getRange("M53:N103");
  var values = range.getValues();
  
  // Replace "O" with the column letter that you want to update
  var updateColumn = "N";
  var updateColumnNumber = sheet.getRange(updateColumn + "1").getColumn();
  // Replace "D1" and "E1" with the cell references for the lower and upper bounds
  var lowerBound = othersheet.getRange("D2").getValue();
  var upperBound = othersheet.getRange("C2").getValue();
  
  for (var i = 0; i < values.length; i++) {
    var columnMValue = values[i][0];
    var columnNValue = values[i][1];
    
    if (columnMValue >= lowerBound && columnMValue <= upperBound) {
      sheet.getRange(i+53, updateColumnNumber).setValue(1); // +2 because the range starts at row 2
    }
    else {
      sheet.getRange(i+53, updateColumnNumber).setValue(0);
    }
  }
}