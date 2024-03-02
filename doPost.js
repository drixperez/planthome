const sheet = sheets.getSheetByName("Sheet2");
var cRanges = ['A2:F2', 'A3:F3']; 
//set up the sheet and range of cells to be written to


function doPost(request){
 for (var i=0; i<cRanges.length; i++) {
   sheet.getRange(cRanges[i]).clear({formatOnly: true, contentsOnly: true, skipFilteredRows: false});}
//for loop going from 0 to the length of the row in the range clearing the contents and format
 let  data = request.formData;
 sheet.appendRow([data.TempMax, data.TempMin, data.MoistMax, data.MoistMin,  data.LightMax,  data.LightMin]);
//the request.formData object simplifies the form-given data into an array of its name and value
//a row of the numerical data of each environment variable is then appended to the sheet in place of the old row
 Utilities.sleep(5000);
//the script waits 5s because i want to ensure that the new limits are loaded into the sheet before the graph-acceptability-range-adjusting scripts use the values to adjust the graphs accordingly
 updateLightGraphRange();
 updateMoistureGraphRange();
 updateTempGraphRange();
}
