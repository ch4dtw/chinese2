var audio, right, wrong;
$(document).ready(function(){
    audio = document.createElement('audio');
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/pass.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    $.get();
});

//
$('.draggable').draggable({ revert: 'invalid' });
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
        $( this ).addClass( 'ui-state-highlight' );
	ui.draggable.css('position','static')
    var id = $(this).children('div.holder').children('.draggable');
	if(id) { id = id.attr('id');Resume(id);}
    $( this ).children('div.holder').html(ui.draggable).append($('<button class="btn remove"></button>'));
    ToggleRemove();
    }
});

//
var score=0;
$('.check').click(function(){
    score=0;
    $('.droppable').each(function(){
        var tmp = $(this).children('div.holder');
        //console.log('_'+tmp.children('.draggable').attr('id'));
        if(tmp.attr('id') === '_'+tmp.children('.draggable').attr('id')){
            $(this).addClass('btn-success') 
            $(this).removeClass('btn-danger') 
            score+=5;
        }
        else{
            $(this).addClass('btn-danger') 
            $(this).removeClass('btn-success') 
        }
    })
    if(score == 15) right.play();
    else wrong.play();
    $('span#score').text(score);
    $('span.check-text').text('再玩一次')
})

//
function ToggleRemove(){
    $('.remove').click(function(){
        var id = $(this).prev('.draggable').attr('id');
        Resume(id);
        $(this).parent('div.holder').empty();
        $(this).parent('div.holder').parent('btn.droppable').removeClass('btn-danger btn-success'); 
    });
}

//
function Resume(id){
    $('div#'+id).html('<img class="draggable" id="'+id+'" src="img/'+id+'.jpg">');
    $('img#'+id).draggable({ revert: "invalid" });
}

//錯誤時顯示圖片
function showError() {
    $('#cross').css('display', 'block');

    setTimeout(function () {
        $('#cross').css('display', 'none');
    }, 750);
}