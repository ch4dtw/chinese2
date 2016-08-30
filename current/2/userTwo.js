var audio, right, wrong;
var stage = 0;
    var isPrompt = 0;
    var run = 0;
$(document).ready(function () {
    audio = document.createElement('audio');
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/pass.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    $.get();
});

//
$('.draggable').draggable({revert: 'invalid'});
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function (event, ui) {
        $(this).addClass('ui-state-highlight');
        ui.draggable.css('position', 'static');
        var id = $(this).children('div.holder').children('.draggable');
        if (id) {
            id = id.attr('id');
            Resume(id);
        }
        $(this).children('div.holder').html(ui.draggable).append($('<button class="btn remove"></button>'));
        ToggleRemove();
    }
});

//對答案按鈕功能
var score = 0;
$('.check').click(function () {
    score = 0;
    $('.droppable').each(function () {
        var tmp = $(this).children('div.holder');
        if (tmp.attr('id') === '_' + tmp.children('.draggable').attr('id')) {
            score += 5;
        }
    });
    if (score == 15) {
        right.play();
        showCorrect()
    }
    else {
        wrong.play();
        $('span#score').text(score);
        showError();
    }
});

//
function ToggleRemove() {
    $('.remove').click(function () {
        var id = $(this).prev('.draggable').attr('id');
        Resume(id);
        $(this).parent('div.holder').empty();
        $(this).parent('div.holder').parent('.btn.droppable').removeClass('btn-danger btn-success');
    });
}
//答對時顯示圖片
function showCorrect() {
	alert(stage);
	if(stage == 1){
		$('#FireRing').css('display', 'block');
	}	
	else if(stage == 2){
		$('#again').css('display', 'block');
	}	
}

//錯誤時顯示按鈕
function showError() {
	if(stage == 1){
		$('#fail1').css('display', 'block');
	}
	else if(stage == 2){
		$('#fail2').css('display', 'block');
	}
}


//
function Resume(id) {
    $('div#' + id).html('<img class="draggable" id="' + id + '" src="img/' + id + '.jpg">');
    $('img#' + id).draggable({revert: "invalid"});
}
	
//按左鍵出現Start按鈕的畫面
    $(document).on('click', function () {
        if (isPrompt == 1) {
            run++;
			
            if (stage == 0 && run >= 2) {
                $("#GamePrompt1").hide();
                $("#GameStart1").fadeIn();
                stage++;
                isPrompt = 0;
                run = 0;
            }
            else if (stage == 1 && run >= 2) {
                $("#GamePrompt2").hide();
                $('#GameStart2').fadeIn();
                stage++;
                isPrompt = 0;
                run = 0;
            }
        }
    });
//下一關
    function showDialog() {
        if (stage == 0) {
            $("#start_page").hide();
            $("#GamePrompt1").fadeIn(2000);
            isPrompt = 1;
        }
        else if (stage == 1) {
            $("#first_page").hide();
            $("#GamePrompt2").fadeIn(2000);
            isPrompt = 1;
        }
    }
//挑戰成功畫面	
    function is_success(success) {
        if (success == 1) {
            $("#secon_page").hide();
            $("#gameSuccess").fadeIn();
            $("#get1").fadeIn(2000);
            $("#get2").fadeIn(2000);
        }
    }
//第一關 成功或失敗 畫面	
	function end1(num){
		if(num == 0){
			$("#FireRing").fadeIn();
		}
		else if(num == 1){
			$("#fail1").fadeIn();
		//	$("#fail1_btn").fadeIn();
		}
		
	}