function doPost(args){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    var size = Object.keys(sheets).length;
    console.log(size);
    console.log(sheet[0].getName());
    // selecting sheet
    var sheet = args.parameter.sheetName;
    for(let i = 0;i < size; i++){
        if(sheet == sheets[i].getName())
            {
                var sheetName = sheet;
                break;
            }
    }
    /*
        alternate way
    var sheet_name_1 = sheet[0].getName();
    var sheet_name_2 = sheet[1].getName();
    var sheet_name_3 = sheet[2].getName();
    if(args.parameter.sheetName == sheet_name_1)
      var sheetName = sheet_name_1;
    else if (args.parameter.sheetName == sheet_name_2)
      var sheetName = sheet_name_1;
    else if (args.parameter.sheetName == sheet_name_3)
      var sheetName = sheet_name_1;
      */
    
    var sheetname = ss.getSheetByName(sheetName);
    if(args.parameter.action == "addRecords")
      return addRecords(args,sheetname);         
}

function addRecords(args,sheetname){
  var data = JSON.parse(args.postData.contents)
  // sheetname.clear();
  clear(sheetname,1);
  sheetname.appendRow([data.col_name]); //can contain multiple col name as shown in eg below:
  //eg :->sheetname.appendRow([data.order_date,data.Recon_Count,data.Recon_GMV,data.dwh_Count,data.dwh_GMV,data.Count_diff,data.GMV_diff]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

function clear(sheet, headerSize = 0) {
  const nRows = sheet.getMaxRows();                   // number of rows on the sheet
  const nColumns = sheet.getMaxColumns();             // number of columns on the sheet
  const lastCell = sheet.getRange(nRows, nColumns);   // the last cell of this sheet
  // get the cells from the row just below the header
  //  from the first to the last column
  const data = sheet.getRange('A' + (headerSize + 1) + ':' + lastCell.getA1Notation());  
  data.clear();
}
