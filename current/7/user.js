var boo, applause;
$(document).ready(function () {
    boo = document.createElement('audio');
    applause = document.createElement('audio');
    boo.setAttribute('src', 'audio/boo.mp3');
    applause.setAttribute('src', 'audio/applause.mp3');
    //audioElement.load()
    $.get();
    $(applause).bind('ended', function () {
        $('.Liao').attr('src', 'img/Liao.png');
    })
});

var Ans = ['fat', 'work', 'money', 'child'];
var score = 0, cnt = 0;

$('.draggable').draggable({revert: 'invalid'});
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function (event, ui) {
        $(this).addClass('ui-state-highlight');
        ui.draggable.remove();
        if (Ans.indexOf(ui.draggable.attr('id')) != -1) {
            applause.play();
            score += 25;
            cnt++;
            $('.Liao').attr('src', 'img/Liao-1.png');
        }
        else {
            boo.play();
            cnt++;
            score -= 5;
        }
        if (cnt == 4) {
            $(this).droppable('disable');
            $('.draggable').draggable('disable');
            end();
        }
        $('#score').html(score);
    }
});

$('#sta_btn').on('click', function (){
	$("#startimg").hide();
	$("#game").fadeIn();
});

function end() {
    if(score == 100)gameDone();
    else gameFailed();
}
function gameDone() {
    $('#success').show();
}
function gameFailed() {
    $('.Liao').hide();
    $('.fail').show();
}

function restart(){
    score = 0;
    cnt = 0;
    var right = $('#right');
    var left = $('#left');
    var draggable = $('.draggable');
    $('#score').html(score);
    $('.Liao').show();
    $('.fail').hide();
    draggable.remove();
    resetDroppable();
    right.append('<div class="draggable" id="child"><img class="drag_img" src="img/child.jpg" ></div>');
    right.append('<div class="draggable" id="family"><img class="drag_img" src="img/family.jpg" ></div>');
    right.append('<div class="draggable" id="price"><img class="drag_img" src="img/price.jpg" ></div>');
    left.append('<div class="draggable" id="fat"><img class="drag_img" src="img/fat.jpg" ></div>');
    left.append('<div class="draggable" id="work"><img class="drag_img" src="img/work.jpg" ></div>');
    left.append('<div class="draggable" id="money"><img class="drag_img" src="img/money.jpg" ></div>');
    draggable = $('.draggable');
    draggable.draggable({revert: "invalid"});
    draggable.draggable('enable');
}

function resetDroppable(){
    $('.droppable').droppable('enable', {
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function (event, ui) {
            $(this).addClass('ui-state-highlight');
            ui.draggable.remove();
            if (Ans.indexOf(ui.draggable.attr('id')) != -1) {
                applause.play();
                score += 25;
                cnt++;
                $('.Liao').attr('src', 'img/Liao-1.png');
            }
            else {
                boo.play();
                cnt++;
                score -= 5;
            }
            if (cnt == 4) {
                $(this).droppable('disable');
                $('.draggable').draggable('disable');
                end();
            }
            $('#score').html(score);
        }
    });
}