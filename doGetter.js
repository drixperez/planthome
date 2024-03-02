function doGet(e) {
  var x = HtmlService.createTemplateFromFile("form submissions");
 //setup the form submission file as an html input
  var y = x.evaluate();
 //evalute the submission
  var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
 //understand the submission as an XFRAME and allow given submissions
  return z;
 }
 
 
 function getSheetData()  {
  var x= SpreadsheetApp.getActiveSpreadsheet();
 //get the spreadsheet for this app script
  var y= x.getSheetByName('Sheet2');
 //get the second sheet
  var z = y.getRange('A2:F2');
 //get the limit values from the a2 to f2 cell range
  return z.getValues();  
 }
 