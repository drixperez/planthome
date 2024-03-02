const sheets = SpreadsheetApp.openByUrl("REDACTED");
const sheet = sheets.getSheetByName("Sheet2");
var cRanges = ['A2:F2', 'A3:F3'];  

function doPost(e){
  for (var i=0; i<cRanges.length; i++) { 
    sheet.getRange(cRanges[i]).clear({formatOnly: true, contentsOnly: true, skipFilteredRows: false});}
  let  data = e.parameter;
  sheet.appendRow([data.TempMax, data.TempMin, data.MoistMax,	data.MoistMin,	data.LightMax,	data.LightMin]);
  return ContentService.createTextOutput("Success");
}