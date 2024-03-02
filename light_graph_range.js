function updateLightGraphRange() {
  var sheet = sheets.getSheetByName("Sheet1");
  var othersheet = sheets.getSheetByName("Sheet2");
 //storing both sheets of the spreadsheet as variables 
  var range = sheet.getRange("B43:C93");
 //declare the range for the bar chart columns of data 
  var values = range.getValues();
 //retrieve the values from the bar chart columns
  var acceptanceColumn = "C";
  var updateColumnNumber = sheet.getRange(acceptanceColumn + "1").getColumn();
 // define the column to update (acceptance column) and the first cell in this column C1
  var lowerBound = othersheet.getRange("F2").getValue();
  var upperBound = othersheet.getRange("E2").getValue();
 //retrieve the upper and lower limits from F2 and E2 on the othersheet
   for (var i = 0; i < values.length; i++) {
    var columnBValue = values[i][0];
    var columnCValue = values[i][1];
 //for loop from the first row of the barchart to the last row, given by length of the values array
   
    if (columnBValue >= lowerBound && columnBValue <= upperBound) {
 //check if the value in the temperature column is between the limits
      sheet.getRange(i+43, updateColumnNumber).setValue(1); 
 // if the value is, then set the value in the acceptance column to one
//  (we add 2 to i because although it is checking the ith value in the given range the actual row value in the spreadsheet is 2 lower as the range starts on the 2nd row of the spreadsheet)
    }
    else {
      sheet.getRange(i+43, updateColumnNumber).setValue(0);
 // if the value isn’t in the range set the value in the acceptance column to 0 using the same arguments
    }
  }
 }
 