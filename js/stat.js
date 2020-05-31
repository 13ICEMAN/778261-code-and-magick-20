'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';

  ctx.fillText('Ура вы победили!', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 2));
  ctx.fillText('Список результатов:', CLOUD_X + (GAP * 2), CLOUD_Y + (GAP * 4));

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + (GAP * 4) + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + (GAP * 4) + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP - GAP * 3 + (BAR_HEIGHT * times[i] / maxTime));
  }

  for (i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + (GAP * 4) + (BAR_GAP + BAR_WIDTH) * i, FONT_GAP - GAP, BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
  }
};
