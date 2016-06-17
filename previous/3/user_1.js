var audio, right, wrong;
$(document).ready(function(){
    audio = document.createElement('audio');
    audio.setAttribute('src', 'audio/music.mp3');
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    $.get();
    $(audio).bind('ended', function(){
        $('button.play span').addClass('glyphicon-play').removeClass('glyphicon-pause');
    });

});
$('button.play').click(function(){
    var span = $(this).children('span');
    if(span.hasClass('glyphicon-play')){
        audio.play();
    }
    else
        audio.pause();
    span.toggleClass('glyphicon-play').toggleClass('glyphicon-pause');
})
$('.draggable').draggable({ revert: 'invalid' });
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
        $( this ).addClass( 'ui-state-highlight' );
	ui.draggable.css('position','static')
    var id = $(this).children('div.holder').children('.draggable');
	if(id) { id = id.attr('id');Resume(id);}
    $( this ).children('div.holder').html(ui.draggable).append($('<button class="btn remove"><span class="glyphicon glyphicon-remove"></span></button>'));
    ToggleRemove();
    }
});
var score=0;
$('.check').click(function(){
    score=0;
    $('.droppable').each(function(){
        var tmp = $(this).children('div.holder');
        //console.log('_'+tmp.children('.draggable').attr('id'));
        if(tmp.attr('id') === '_'+tmp.children('.draggable').attr('id')){
            $(this).children('span.check').html($('<span class="glyphicon glyphicon-ok"></span>'))
            $(this).addClass('btn-success') 
            $(this).removeClass('btn-danger') 
            score+=5;
        }
        else{
             $(this).children('span.check').html($('<span class="glyphicon glyphicon-remove"></span>'))
            $(this).addClass('btn-danger') 
            $(this).removeClass('btn-success') 
        }
    })
    if(score == 30) right.play();
    else wrong.play();
    $('span#score').text(score);
    $('span.check-text').text('重對答案')
})

function ToggleRemove(){
    $('.remove').click(function(){
        var id = $(this).prev('.draggable').attr('id');
        Resume(id);
        $(this).parent('div.holder').empty();
        $(this).parent('div.holder').parent('btn.droppable').removeClass('btn-danger btn-success'); 
    });
}

function Resume(id){
    $('div#'+id).html('<img class="draggable" id="'+id+'" src="img/'+id+'.png">');
    $('img#'+id).draggable({ revert: "invalid" });
}
