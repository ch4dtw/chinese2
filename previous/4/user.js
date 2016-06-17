$('.draggable').draggable({ 
	revert: 'invalid',
	helper: myHelper
});
function myHelper(event) {return '<div id="draggingObj" class="dragging" style="">'+$('#'+draggingId).html()+'</div>'; }

$('.draggable').mousedown(function(event){
	draggingId = this.id;
});

$('.droppable').droppable({
  drop: function( event, ui ) {
		if(checkAndRenew(ui.draggable.attr('id'), $(this).attr('id'))) {
			reDraw();
		} else {
			drawLine(ui.draggable.attr('id'), $(this).attr('id'), 'black');			
		}
  }
});

function checkAndRenew(leftId, rightId) {
	var redraw = false;
	var initLen = lineIndex.length;

	lineIndex = jQuery.grep(lineIndex, function(value){
		return value['leftId'] != leftId && value['rightId'] != rightId;
	});

	if(lineIndex.length != initLen){
		redraw = true;
	}

	lineIndex.push({'leftId': leftId, 'rightId': rightId, 'color': 'black'});
	return redraw;
}

function reDraw() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	for(var i = 0; i < lineIndex.length; i++) {
		drawLine(lineIndex[i]['leftId'], lineIndex[i]['rightId'], lineIndex[i]['color']);
	}
}

function getTwoEnds(leftId, rightId) {
	var leftOffset = $('#' + leftId + '_connect_left').offset();
	var rightOffset = $('#' + rightId + '_connect_right').offset(); 

	var from_x = leftOffset.left - canvasOffset.left;
	var from_y = leftOffset.top - canvasOffset.top;
	var to_x = rightOffset.left - canvasOffset.left;
	var to_y = rightOffset.top - canvasOffset.top;
    
	return [from_x, from_y, to_x, to_y];
}

function drawLine(leftId, rightId, color) {
	var positions = getTwoEnds(leftId, rightId);
	from_x = positions[0];
	from_y = positions[1];
	to_x = positions[2];
	to_y = positions[3];
	ctx.beginPath();
	ctx.lineWidth = "2";
	ctx.strokeStyle = color;
	ctx.moveTo(from_x, from_y);
	ctx.lineTo(to_x, to_y);
	ctx.stroke();
}

$('button').click(function() {
	var score = 0;
	for(var i = 0; i < lineIndex.length; i++) {
		var leftId = lineIndex[i]['leftId'];
		var rightId = lineIndex[i]['rightId'];
		if(answers[leftId] != rightId) {
			lineIndex[i]['color'] = 'red';
		} else {
			score += 3;
		}
	}
	reDraw();
	alert('You scored ' + score + ' points in this section!');
});

var lineIndex = [];

var ctx;
var canvasOffset;
var canvasHeight;
var canvasWidth;

var answers = [0, 8, 5, 3, 1, 2, 7, 3, 9, 4];

window.onload = function() {
	canvasHeight = $('.left-div').height();
	canvasWidth = $('.container#content').width();
	$('.starter-template').after('<canvas id="myCanvas" width="'+canvasWidth+'px" height="'+canvasHeight+'px" style="position:absolute; z-index:1;">Your Browser does not support HTML5 canvas tag</canvas>');

	ctx = $('#myCanvas')[0].getContext("2d");
	canvasOffset = $('#myCanvas').offset();
};

window.onresize = function() {
	//var testOffset = $('#1_connect_right').offset();
	//alert('x: ' + testOffset.left + ' y: ' + testOffset.top); 
  $('#myCanvas').width($('.container#content').width());
	$('#myCanvas').height($('.left-div').height());
	canvasWidth = $('#myCanvas').width();
	canvasHeight = $('#myCanvas').height();

	canvasOffset = $('#myCanvas').offset();
	ctx = $('#myCanvas')[0].getContext("2d");
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  reDraw();
};

