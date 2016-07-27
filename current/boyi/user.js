var score = 0;
var count = 0;
var check = false;
var stage = 1;

$(document).ready(function () {
    $('div.flex.flex-row').each(function () {
        $(this).hide();
    });
    showDialog(stage)
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
            // 正確
            if (droppableId == (draggableId + '_droppable')) {
                Resume('DIV_' + draggableId);
                $('div#' + droppableId).html('<img class="imag_size"  src="img/' + draggableId + '.jpg">');
                score += 10;
                count += 1;
                check = true;
                $('audio')[0].play();
            }
            // 錯誤
            else {
                $('div#' + 'DIV_' + draggableId).html('<img class="draggable" id="' + draggableId + '" src="img/' + draggableId + '.jpg">');
                $('img#' + draggableId).draggable({revert: "invalid"});
                score -= 5;
                showError();
                $('audio')[1].play();
            }
            $('#score').text(score);
            if (check == true) {
                switch (count) {
                    case 3:
                        break;
                    case 6:
                        break;
                    case 10:
                        break;
                    default:
                        break;
                }
                check = false;
                next();

            }

        }
    });
});
//移除物件
function Resume(id) {
    $('div#' + id).html('');
}
//答錯時顯示錯誤圖片
function showError() {
    $('#cross').css('display', 'block');

    setTimeout(function () {
        $('#cross').css('display', 'none');
    }, 750);
}
//呼叫彈出視窗
function next() {
    // $('#myModal').modal({backdrop: 'static'});	//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    $('#dialog-confirm').dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: [
            {
                text: "重新開始",
                "class": "btn btn-danger",
                click: function(){
                    location.reload();
                    $(this).dialog('close');
                }
            },
            {
                text: "下一關",
                "class": "btn btn-primary",
                click: function(){
                    stage += 1;
                    gotoLevel(stage);
                    showDialog(stage);
                    $(this).dialog('close');
                }
            }
        ]
    });
    $('div.ui-dialog-titlebar > button.ui-button').addClass("ui-button ui-corner-all ui-widget ui-button-icon-only");
    // $('div.ui-dialog-titlebar > button.ui.button').html('<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>Close</button>');
}
// 綁定下一關按鈕
// $('#nextStageButton').click(function () {
//
// });

// 顯示下一關內容(依據傳入的level決定)
function gotoLevel(level) {
    if (level == 1) {
        $("#A_droppable").fadeIn();
        $("#p_A").fadeIn(500);
        $("#B_droppable").fadeIn(1000);
        $("#p_B").fadeIn(1500);
        $("#C_droppable").fadeIn(2000);
        $("#p_C").fadeIn(2500);
    } else if (level == 2) {

        $("#D_droppable").fadeIn();
        $("#p_D").fadeIn(500);
        $("#E_droppable").fadeIn(1000);
        $("#p_E").fadeIn(1500);
        $("#F_droppable").fadeIn(2000);
        $("#p_F").fadeIn(2500);
    } else if (level == 3) {
        $("#G_droppable").fadeIn();
        $("#p_G").fadeIn(500);
        $("#H_droppable").fadeIn(1000);
        $("#p_H").fadeIn(1500);
        $("#I_droppable").fadeIn(2000);
        $("#p_I").fadeIn(2500);
        $("#J_droppable").fadeIn(3000);
        $("#p_J").fadeIn(3500);
    }
    else
        alert('WTF?!');
}

function showDialog(stage) {
    $($('div.flex.flex-row')[stage - 1]).fadeIn();
}