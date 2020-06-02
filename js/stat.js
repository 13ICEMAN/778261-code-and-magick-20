'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var DOUBLE_GAP = 20;
var TRIPLE_GAP = 30;
var FOURFOLD_GAP = 40;
var FONT_GAP = 250;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomColor = function () {
  var randomColor = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  return randomColor;
};

var colorShadow = 'rgba(0, 0, 0, 0.7)';
var colorCloud = '#ffffff';
var colorText = '#000000';
var colorMyResult = 'rgba(255, 0, 0, 1)';
var fontParameter = '16px PT Mono';
var textZero = 'hanging';
var victory = 'Ура вы победили!';
var list = 'Список результатов:';

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, colorShadow);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, colorCloud);

  ctx.fillStyle = colorText;
  ctx.font = fontParameter;
  ctx.textBaseline = textZero;

  ctx.fillText(victory, CLOUD_X + DOUBLE_GAP, CLOUD_Y + DOUBLE_GAP);
  ctx.fillText(list, CLOUD_X + DOUBLE_GAP, CLOUD_Y + FOURFOLD_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = colorText;
    ctx.fillText(players[i], CLOUD_X + FOURFOLD_GAP + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + FOURFOLD_GAP + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP - TRIPLE_GAP + (BAR_HEIGHT * times[i] / maxTime));

    if (players[i] === 'Вы') {
      ctx.fillStyle = colorMyResult;
    } else {
      ctx.fillStyle = getRandomColor();
    }
    ctx.fillRect(CLOUD_X + FOURFOLD_GAP + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP - GAP, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  }
};
