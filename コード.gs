function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('videos');
  var last_column = sheet.getLastColumn();
  var last_row = sheet.getLastRow();
  var range_key = sheet.getRange(1, 1, 1, last_column);
  var range_value = sheet.getRange(2, 1, last_row, last_column);
  range_value.sort([{column: 9, ascending: false}]); // 公開日順に並び替え
  var raw_key = range_key.getValues();
  var raw_value = range_value.getValues();
  
  var data = []; 
  var limit = e.parameter.limit;
  for (var i in raw_value) {
    var tmp = {};
    if (data.length == limit) {
      continue;
    }
    
    if(!e.parameter.tag) { //tagが指定されていない場合
      for (var j in raw_value[i]) {
        tmp[raw_key[0][j]] = raw_value[i][j];
      }
      if (tmp['valid_flg'] == 1) {
        data.push(tmp);
      }
    } else { // tagが指定されている場合
      var tag = e.parameter.tag;
      for (var j in raw_value[i]) {
        tmp[raw_key[0][j]] = raw_value[i][j];
      }
      if (tmp['valid_flg'] == 1) {
        if (tmp['creator_name_en'] == tag || tmp['country_name_en'] == tag || tmp['area_name_en'] == tag || tmp['spot_name_en'] == tag || tmp['sea_name_en'] == tag || tmp['other_en'] == tag) {
          data.push(tmp);
        }
      }
    }
  }
  return ContentService.createTextOutput(JSON.stringify(data));    
}
