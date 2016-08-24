var audio, right, wrong;
$(document).ready(function () {
    audio = document.createElement('audio');
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/pass.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
});

//拖拉功能
$('.draggable').draggable({revert: 'invalid'});
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function (event, ui) {
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

//圖片旁邊小小的按鈕
function ToggleRemove() {
    $('.remove').click(function () {
        var id = $(this).prev('.draggable').attr('id');
        Resume(id);
        $(this).parent('div.holder').empty();
        $(this).parent('div.holder').parent('btn.droppable').removeClass('btn-danger btn-success');
    });
}

//
function Resume(id) {
    $('div#' + id).html('<img class="draggable" id="' + id + '" src="img/' + id + '.jpg">');
    $('img#' + id).draggable({revert: "invalid"});
}

//答對時顯示圖片
function showCorrect() {
    $('#FireRing').css('display', 'block');
}

//錯誤時顯示按鈕
function showError() {
    $('#again').css('display', 'block');
}

var stage = 0;

function showDialog() {
    if (stage == 0) {
        stage++;

        $(".modal-body").html("<h1><p style = 'color:#0066FF;' class = 'text-center'>Round 1 -教育態度分分看</p></h1><h4><p style = 'color:#FF0000;' class = 'text-center'>課文中對於哪吒而言，太乙就像他第二個父親，兩位父親分別代表不同教育態度，請依照課文內容來分析，這些形容詞分別代表哪位人物的教育態度。</p></h4>");

        $(".modal-footer").html('<button type="button" class="btn btn-success" data-dismiss="modal" >開始遊戲</button>');
        $("#start_page").hide();
        $("#first_page").html('<h1 class = "text-center">我是第一關</h1>');
        $('#myModal').modal({backdrop: 'static'});//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
        //alert(stage);
    }
    else if (stage == 1) {
        stage++;
        $(".modal-body").html("<h1><p style = 'color:#0066FF;' class = 'text-center'>Round 2 -人物關係對對碰</p></h1><h4><p style = 'color:#FF0000;' class = 'text-center'>在《封神榜裡的哪吒》課文中出現四位重要人物，太乙、哪吒、李靖、四氓。以哪吒為主角，放入其他角色關係，即可完成作答。</p></h4>");
        //alert(stage);
        //點擊button會執行 show() ，出現第二關畫面
        $(".modal-footer").html('<button type="button" class="btn btn-success" data-dismiss="modal" onclick = "show();">開始遊戲</button>');
        $('#myModal').modal({backdrop: 'static'});//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
        $("#first_page").hide();


    }

}
function show() {
    if (stage == 2) {
        $('#secon_page').fadeIn();
    }
}
function is_success(success) {
    if (success == 1) {
        $(".modal-body").html("<h1><p style = 'color:#FF0000;' class = 'text-center'>挑戰成功</p></h1><br><h4><p style = 'color:#0066FF;' class = 'text-center'>恭喜你挑戰成功<br>再挑戰一次吧!</p></h4>");
        $(".modal-footer").html('<button type="button" class="btn btn-success" data-dismiss="modal" onclick="location.reload();">再玩一次</button>');
        $('#myModal').modal({backdrop: 'static'});//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    }
    else if (success == 2) {
        $(".modal-body").html("<h1><p style = 'color:#FF0000;' class = 'text-center'>挑戰失敗</p></h1><br><h4><p style = 'color:#0066FF;' class = 'text-center'>太可惜了<br>再挑戰一次吧!</p></h4>");
        $(".modal-footer").html('<button type="button" class="btn btn-success" data-dismiss="modal" onclick="location.reload();">再玩一次</button>');
        $('#myModal').modal({backdrop: 'static'});//backdrop: 'static' : 設定讓彈出視窗點擊灰色背景不會關
    }
}
