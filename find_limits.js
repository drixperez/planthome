function getSheetData()  {
    //this function is directly called by the HTML script
     var spreadsheet= SpreadsheetApp.getActiveSpreadsheet();
    //get the spreadsheet on which the apps script is built
     var sheet= spreadsheet.getSheetByName('Sheet2');
    //get the second sheet
     var range = sheet.getRange('A2:F2');
    //get the range A2:F2
     return range.getValues();  
    //return these values
    }
    //this function makes a request to the google sheet to get the specified range of values and returns them as an array to the HTML so that they can be displayed
    