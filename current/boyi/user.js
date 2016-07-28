var score = 0;
var count = 0;
var check = false;
var stage = 0;
var chr = 'A';
var amountList = [3, 3, 4];
// 前三個不是訊息
var nowAmount = 0;

$(document).ready(function () {
    startEnd();
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
                    case 6:
                        next();
                        break;
                    case 10:
                        startEnd();
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
function next() {
    // $('#myModal').modal({backdrop: 'static'});	//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    $('#dialog-confirm').dialog({
        resizable: false,
        height: "auto",
        width: "30%",
        modal: true,
        buttons: [
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
                "class": "btn btn-primary",
                click: function () {
                    showDialog(amountList[stage]);
                    stage += 1;
                    $(this).dialog('close');
                }
            }
        ]
    });
}

//呼叫開始視窗
function startEnd() {
    // $('#myModal').modal({backdrop: 'static'});	//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    $('#dialog-confirm').dialog({
        resizable: false,
        height: "auto",
        width: "30%",
        modal: true,
        buttons: [
            {
                text: "重新開始",
                "class": "btn btn-danger",
                click: function () {
                    location.reload();
                    $(this).dialog('close');
                }
            },
            {
                text: "開始遊戲",
                "class": "btn btn-primary",
                click: function () {
                    showDialog(amountList[stage]);
                    stage += 1;
                    $(this).dialog('close');
                }
            }
        ]
    });
}

function showDialog(amount) {
    if (stage == 3)
        alert(1);
    for (var i = 0; i < amount; i++) {
        console.log(nowAmount);
        $msgRow = $('div#chatroom > div.row');
        $($msgRow[nowAmount]).fadeIn();
        $('div.avatar:nth-child(' + (nowAmount+1) + ')').fadeIn();
        if (i == amount-1) {
            console.log('Scroll It!');
            $('div#chatroom').animate({
                scrollTop:  $($msgRow[nowAmount-i]).offset().top
            }, 2000, 'easeOutBounce');
        }
        nowAmount += 1;
    }
}