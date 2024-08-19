// jewel.gs 파일 내용임

let auctionItemCount = 40;

//3tier
function trrigerGetPriceForJewelAll() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('jewel');

  for (let i = 0; i < auctionItemCount; i++) {
    if (i < 20) {
      getPriceForJewel(2 + i, sheet.getRange(2 + i, 1).getValue());
    } else {
      t4_getPriceForJewel(2 + i, sheet.getRange(2 + i, 1).getValue());
    }
  }
}

function getPriceForJewel(inputRow, inputString) {
  let strr = {
    ItemLevelMin: 0,
    ItemLevelMax: 0,
    ItemGradeQuality: 0,
    Sort: 'BUY_PRICE',
    CategoryCode: 210000,
    CharacterClass: '',
    ItemTier: 3,
    ItemGrade: '',
    ItemName: inputString,
    PageNo: 0,
    SortCondition: 'ASC',
  };

  let payload = JSON.stringify(strr);

  let options = {
    method: 'POST',
    muteHttpExceptions: true,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authorization: getKey(),
    },
    payload: payload,
  };

  let response = UrlFetchApp.fetch('https://developer-lostark.game.onstove.com/auctions/items', options);

  response = JSON.parse(response.getContentText());

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('jewel');

  sheet.getRange(inputRow, 2).setValue(response.Items[0].Grade);
  sheet.getRange(inputRow, 3).setValue(response.Items[0].Tier);
  sheet.getRange(inputRow, 4).setValue(response.Items[0].Icon);
  sheet.getRange(inputRow, 5).setValue(response.Items[0].AuctionInfo.BuyPrice);
}

function getAuctionOption() {
  var options = {
    method: 'GET',
    muteHttpExceptions: true,
    'Content-Type': 'text/html',
    headers: {
      accept: 'application/json',
      authorization: getKey(),
    },
  };

  var response = UrlFetchApp.fetch('https://developer-lostark.game.onstove.com/auctions/options', options);
  var html = response.getContentText('UTF-8');

  console.log(html);
}

//4tier

function t4_getPriceForJewel(inputRow, inputString) {
  let strr = {
    ItemLevelMin: 0,
    ItemLevelMax: 0,
    ItemGradeQuality: 0,
    Sort: 'BUY_PRICE',
    CategoryCode: 210000,
    CharacterClass: '',
    ItemTier: 4,
    ItemGrade: '',
    ItemName: inputString,
    PageNo: 0,
    SortCondition: 'ASC',
  };

  let payload = JSON.stringify(strr);

  let options = {
    method: 'POST',
    muteHttpExceptions: true,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authorization: getKey(),
    },
    payload: payload,
  };

  let response = UrlFetchApp.fetch('https://developer-lostark.game.onstove.com/auctions/items', options);

  response = JSON.parse(response.getContentText());

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('jewel');

  sheet.getRange(inputRow, 2).setValue(response.Items[0].Grade);
  sheet.getRange(inputRow, 3).setValue(response.Items[0].Tier);
  sheet.getRange(inputRow, 4).setValue(response.Items[0].Icon);
  sheet.getRange(inputRow, 5).setValue(response.Items[0].AuctionInfo.BuyPrice);
}

function t4_getAuctionOption() {
  var options = {
    method: 'GET',
    muteHttpExceptions: true,
    'Content-Type': 'text/html',
    headers: {
      accept: 'application/json',
      authorization: getKey(),
    },
  };

  var response = UrlFetchApp.fetch('https://developer-lostark.game.onstove.com/auctions/options', options);
  var html = response.getContentText('UTF-8');

  console.log(html);
}

function getKey() {
  return 'bearer api-key';
}
