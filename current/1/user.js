var score = 0;
var count = 0;
var check = false;
var stage = 0;
var amountList = [3, 3, 4];
var nowAmount = 0;

$(document).ready(function () {
    showDialog();
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
                if (count == 10)
                    $('audio')[2].play();
                else
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
                    case 6:
                    case 10:
                        showDialog();
                        break;
                    default:
                        break;
                }
                check = false;
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
//呼叫過關視窗
function showDialog() {
    // $('#myModal').modal({backdrop: 'static'});	//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    setDialogText();
    $('#dialog-confirm').dialog({
        resizable: false,
        closeOnEscape: false,
        height: "auto",
        width: "30%",
        modal: true,
        buttons: getDialogButtons()
    });
    $(".ui-dialog-titlebar").css('background-color','#00BB00');
    $(".ui-dialog-titlebar-close").hide();
    $('button.btn-next').focus();
}
// 顯示訊息
function showItems(amount) {
    for (var i = 0; i < amount; i++) {
        var msgRow = $('div#chatroom > div.row');
        $(msgRow[nowAmount]).fadeIn();
        $('div.avatar:nth-child(' + (nowAmount+1) + ')').fadeIn();
        nowAmount += 1;
    }
    $('div#chatroom').animate({
        scrollTop:  $(msgRow[nowAmount-1]).offset().top
    }, 2000, 'easeOutBounce');
}
// 設定對話視窗按鈕
function getDialogButtons() {
    var buttonList = [];
    if (stage==0){
        buttonList.push({
            text: "開始遊戲",
            "class": "btn btn-primary btn-next",
            click: function () {
                showItems(amountList[stage]);
                stage += 1;
                $(this).dialog('close');
            }
        });
    } else if (stage==3) {
        buttonList.push({
            text: "再來一局",
            "class": "btn btn-danger btn-next",
            click: function () {
                location.reload();
                $(this).dialog('close');
            }
        });
    } else {
        buttonList = $.merge(buttonList, [
            {
                text: "重新開始",
                "class": "btn btn-danger",
                click: function () {
                    location.reload();
                    $(this).dialog('close');
                }
            },
            {
                text: "進下一關",
                "class": "btn btn-primary btn-next",
                click: function () {
                    showItems(amountList[stage]);
                    stage += 1;
                    $(this).dialog('close');
                }
            }
        ]);
    }
    return buttonList;
}
// 設定彈出視窗文字
function setDialogText() {
    var dialog = $('div#dialog-confirm');
    var msg = "";
    var title = "";
    if (stage == 0){
        title = "伯夷列傳聊天室";
        msg = "<p>司馬遷〈伯夷列傳〉圍繞著傳主伯夷和叔齊提到不少人物。</p><p>這些人穿越時空來到現代，共同開了一個Line群組名為<b>伯夷列傳聊天室</b>，聚在一塊聊天，從對話紀錄中，你能否分辨他們誰是誰？</p>";
    } else if (stage == 3) {
        title = "恭喜完成所有關卡！";
        msg = "<p><b>恭喜你你得到了"+score+"分！！！</b></p><p>再來一局吧～</p>";
    } else {
        title = "恭喜過關";
        msg = "請繼續挑戰下一關！";
    }
    dialog.attr('title', title);
    dialog.html(msg);
    dialog.attr('style', 'text-indent:2em; ');
}