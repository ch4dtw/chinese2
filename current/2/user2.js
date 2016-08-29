// stage: 主畫面,解說1,開始1,遊戲1,結束1,解說2,開始2,開始3,結束2,挑戰成功
// onclick: 主畫面,解說1,解說2
var click_status = 0;
var lock = 0;
var game2_count=0;
var game2_correct=0;
var game2_score = 0;

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

//拖拉圖片初始化
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
            // 拿droppable id
            var droppableId = event.target.id;
            // 拿draggable id
            var draggableId = ui.draggable.attr('id');
            Resume('DIV_' + draggableId);
            $('div#' + droppableId).html('<img class="img_size"  src="img/' + draggableId + '.jpg">');
            // 正確
            if (droppableId == (draggableId + '_droppable')) {
                game2_correct += 1;
                game2_count += 1;
            }
            // 錯誤
            else {
                game2_count += 1;
            }
            if(game2_count == 3){
                game2_score += game2_correct*10+5;
                $('#score').text(game2_score);
                if(game2_correct == 3){
                    $('#game2_page').hide();$('#end_page').show();lock=0;
                    $('#start2_mid_img').css('visibility','visible').hide().fadeIn(2000);
                    $('#start2_left_img').css('visibility','visible').hide().fadeIn(6000);
                    $('#start2_right_img').css('visibility','visible').hide().fadeIn(6000);
                }
                else
                    restart_game2();
            }
        }
    });
});
//移除物件
function Resume(id) {
    $('div#' + id).html('');
}

function restart_game2(){
    // 回到第二關初始狀態
    alert("沒全對");
}