<!-- Bootstrap需要使用jQuery，var id = ui.draggable.attr('id'); 所以第一個引入 -->
var score = 0;

$(function () {
    $(".draggable").draggable({snap: ".ui-widget-header", revert: "invalid"});
});

function next() {	//呼叫彈出視窗
    $('#myModal').modal({backdrop: 'static'});	//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關閉
}

function go_LV2() {	//顯示下一關的內容
    $('#myModal').modal('hide');
    $("#D_droppable").fadeIn();
    $("#p_D").fadeIn(500);
    $("#E_droppable").fadeIn(1000);
    $("#p_E").fadeIn(1500);
    $("#F_droppable").fadeIn(2000);
    $("#p_F").fadeIn(2500);
}

$(function () {
    $(".droppable").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            var droppableId = event.target.id; //拿id的方法
            var draggableId = ui.draggable.attr('id');//拿id的方法
            console.log(draggableId + "  " + droppableId);

            if (droppableId == (draggableId + '_droppable')) {
                Resume('DIV_' + draggableId);
                $('div#' + droppableId).html('<img class="imag_size"  src="img/' + draggableId + '.jpg">');
                score += 10;
                $('audio')[0].play();
            }
            else {
                console.log(droppableId + "  " + draggableId);
                $('div#' + 'DIV_' + draggableId).html('<img class="draggable" id="' + draggableId + '" src="img/' + draggableId + '.jpg">');
                $('img#' + draggableId).draggable({revert: "invalid"});
                score -= 5;
                showError();
                $('audio')[1].play();
            }
            $('#score').text(score);
        }
    });
});
function showError(){
    $('#cross').css('display', 'block');

    setTimeout(function(){
        $('#cross').css('display', 'none');
    }, 750);
}
function Resume(id) {
    $('div#' + id).html('');
}