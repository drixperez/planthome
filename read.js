function doGet(e) {
  var x = HtmlService.createTemplateFromFile("WaterHTML");
  var y = x.evaluate();
  var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return z;
}

function getSheetData()  { 
  var x= SpreadsheetApp.getActiveSpreadsheet();
  var y= x.getSheetByName('Sheet2'); 
  var z = y.getRange('A2:F2');
  return z.getValues();   
}