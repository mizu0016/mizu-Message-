function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('Mizuki Connect');
}

// 投稿を読み込む（X風タイムライン）
function getTimeline() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("PostLog") || ss.insertSheet("PostLog");
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  return data.slice(1).reverse().map(row => ({
    date: Utilities.formatDate(new Date(row[0]), "JST", "MM/dd HH:mm"),
    userName: row[1],
    content: row[2]
  }));
}

// 投稿を保存する
function createPost(userName, text) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("PostLog");
  sheet.appendRow([new Date(), userName, text]);
  return true;
}
