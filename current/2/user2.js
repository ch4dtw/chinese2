// stage: 主畫面,解說1,開始1,遊戲1,結束1,解說2,開始2,開始3,結束2,挑戰成功
// onclick: 主畫面,解說1,解說2
var click_status = 0;
var lock = 0;

$(document).ready(function () {
    $('#start1_mid_img').css('visibility', 'visible').hide().fadeIn(2000);
    $('#start1_left_img').css('visibility', 'visible').hide().fadeIn(6000);
    $('#start1_right_img').css('visibility', 'visible').hide().fadeIn(6000);
});

//按左鍵出現Start按鈕的畫面
$(document).on('click', function () {
    if (click_status == 0 && lock == 0) {
        $("#main_page").hide();
        $("#prompt1_page").show();
        click_status += 1;
    }
    else if (click_status == 1 && lock == 0) {
        $("#prompt1_page").hide();
        $("#start1_page").show();
        lock = 1;
        click_status += 1;
    }
    else if (click_status == 2 && lock == 0) {
        click_status += 1;
    }
    else if (click_status == 3 && lock == 0) {
        $("#prompt2_page").hide();
        $("#start2_page").show();
        lock = 1;
        click_status += 1;
    }
});

$(function () {
    $(".draggable").draggable({
        revert: "invalid"
    });
});
//拖拉目標設定與互動
$(function () {
    $(".droppable").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
//             // 正確
//             if (droppableId == (draggableId + '_droppable')) {
                Resume('DIV_' + draggableId);
                $('div#' + droppableId).html('<img class="imag_size"  src="img/' + draggableId + '.jpg">');
//             }
//             // 錯誤
//             else {
//                 $('div#' + 'DIV_' + draggableId).html('<img class="draggable" id="' + draggableId + '" src="img/' + draggableId + '.jpg">');
//                 $('img#' + draggableId).draggable({revert: "invalid"});
//             }
        }
    });
});
//移除物件
function Resume(id) {
    $('div#' + id).html('<img class="draggable" id="' + id + '" src="img/' + id + '.jpg">');
    $('img#' + id).draggable({revert: "invalid"});
}