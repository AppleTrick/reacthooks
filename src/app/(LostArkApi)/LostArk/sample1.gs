// lostark market.gs 파일

let marketItemCount = 55;

function trrigerGetItmePriceTrendAll() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('market');

  for (let i = 0; i < marketItemCount; i++) {
    getItemPriceTrend(2 + i, sheet.getRange(2 + i, 3).getValue());
    console.log(i);
  }
}

function getItemPriceTrend(inputRow, inputId) {
  var options = {
    'method': 'GET',
    'muteHttpExceptions': true,
    'Content-Type': 'text/html',
    'headers': {
      'accept': 'application/json',
      'authorization': getKey()
    },
  };

  try {
    let response = UrlFetchApp.fetch("https://developer-lostark.game.onstove.com/markets/items/" + inputId, options);
    response = JSON.parse(response.getContentText());

    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('market');
    let statsLength = response[0].Stats.length;

    for (let i = 0; i < Math.min(statsLength, 14); i++) {
      sheet.getRange(inputRow, 5 + i).setValue(response[0].Stats[i].AvgPrice);
    }
  } catch (error) {
    console.error('Error fetching data for row ' + inputRow + ' and ID ' + inputId + ': ' + error);
  }
}

// Other functions remain the same...

function getKey() {
  return 'bearer api-key;
}
